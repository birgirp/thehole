var crypto = require('crypto')
var bcrypt = require('bcrypt')
var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const nodemailer = require('nodemailer')

const BCRYPT_SALT_ROUNDS = 12

const dbdata = require('../pgService')

router.get('/', function (req, res, next) {
  console.log('in users router')
  res.send('coming from users router...')
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', function (err, user) {
    if (err) {
      res.status(err.statusCode).send(err)
      return
    }
    req.logIn(user, function () {
      req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000
      res.status(200).send({ user })
    })
  })(req, res, next)
})

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      data = await dbdata.getUserbyEmailOnly(username.toLowerCase().trim())

      if (data.rows.length > 0) {
        user = data.rows[0]
        hash = user.password
        //const match = hash === password ? true : false
        const match = await bcrypt.compare(password, hash)
        if (match) {
          return done(null, user)
        }
      }
      console.log('unknown user')
      return done(null, false).catch((err) => {
        console.log('fail', err)
        //if (err) {
        //    return done(err);
        //}
        return done(null, false)
      })
    }
  )
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

router.get('/getAllUsers', function (req, res) {
  dbdata
    .getAllUsers()
    .then((data) => {
      if (data.rows.length > 0) {
        users = data.rows
        res.json(users)
      } else {
        console.log('No users found')
        res.json(null)
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500)
      res.json({ error: error })
    })
})

router.post('/getuser', function (req, res) {
  dbdata
    .getUserById(req.body.userId)
    .then((data) => {
      if (data.rows.length > 0) {
        user = data.rows[0]
        res.json(user)
      } else {
        console.log('No user found with id ' + req.body.userId)
        res.json(null)
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500)
      res.json({ error: error })
    })
})

router.post('/createUser', async (req, res) => {
  //-----------------------------------------------------------------------------------
  console.log('about to insert user...')
  passwordhashed = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)

  dbdata
    .insertUser(
      req.body.fullName,
      req.body.email,
      req.body.handicap,
      req.body.isadmin,
      passwordhashed
    )
    .then((data) => {
      console.log(JSON.stringify(data))
      res.json(data.rows[0])
    })
    .catch((error) => {
      console.log(error)
      res.status(500)
      res.json({ error: error })
    })
})

router.post('/edituser', async (req, res) => {
  //-----------------------------------------------------------------------------------
  console.log('about to edit user...')

  passwordhashed = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)

  dbdata
    .editUser(
      req.body.fullName,
      req.body.email,
      req.body.handicap,
      req.body.isadmin,
      passwordhashed,
      req.body.userId
    )
    .then((data) => {
      console.log(JSON.stringify(data))
      res.json('true')
    })
    .catch((error) => {
      console.log(error)
      res.status(500)
      res.json({ error: error })
    })
})

router.post('/deleteuser', (req, res) => {
  console.log('about to delete user...')
  console.log(JSON.stringify(req.body.userId))
  dbdata
    .deleteUser(req.body.userId)
    .then((response) => {
      console.log(JSON.stringify(response))
      res.json('ok')
    })
    .catch((error) => {
      console.log(error)
      res.status(500)
      res.json({ error: error })
    })
})

router.post('/sendresetemail', async (req, res) => {
  try {
    if (req.body.email === '') {
      res.status(400).send('email required')
    }
    console.error(req.body.email)
    let email = req.body.email
    let data = await dbdata.getUserbyEmailOnly(email)

    let user = data.rows[0]

    console.log(JSON.stringify(user))

    if (user === null) {
      console.error('email not in database')
      res.status(403).send('email not in db')
    } else {
      const token = crypto.randomBytes(20).toString('hex')
      let now = new Date(Date.now() + 3600 * 1000 * 24)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
      console.log('token', token)
      await dbdata.updateChangePasswToken(user.id, token, now)

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'servicethehole@gmail.com',
          pass: 'mgtxctxlbkmrxpgk',

          //user: `${process.env.EMAIL_ADDRESS}`,
          //pass: `${process.env.EMAIL_PASSWORD}`
        },
      })

      const mailOptions = {
        from: 'servicethehole@gmail.com',
        to: `${email}`,
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          `https://thehole.herokuapp.com/reset/${token}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      }

      console.log('sending mail')

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err)
        } else {
          console.log('here is the res: ', response)
          res.status(200).json('recovery email sent')
        }
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ error: error })
  }
})

router.post('/changepassword', async (req, res) => {
  try {
    let userId = parseInt(req.body.userId)
    let password = req.body.password

    passwordhashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

    let results = await dbdata.changePassword(userId, passwordhashed)
    console.log(JSON.stringify(results))

    res.json({
      message: 'password updated',
    })
  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ error: error })
  }
})

router.post('/reset', async (req, res) => {
  console.log('reset password route....')

  try {
    let token = req.body.token
    let results = await dbdata.getUserByToken(token)
    console.log(JSON.stringify(results.rows))
    if (results.rows && results.rows.length > 0) {
      let o = {
        userId: results.rows[0].id,
        message: 'password reset link ok',
      }
      res.json(o)
    } else {
      res.json({
        userId: -1,
        message: 'token not found or expired',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ error: error })
  }
})

module.exports = router
