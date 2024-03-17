var express = require('express');
var router = express.Router();
const userModel = require("./users")
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// case insensitive search in mongoose
router.get('/find', async function (req, res, next) {
  // let regex = new RegExp("ninj", 'i')   //find all like ninj
  let regex = new RegExp("^ninjan100$", 'i') //find exact
  const user = await userModel.findOne({ "username": regex })
  res.send(user)
});
//  search by category name mongoose
router.get('/findcat', async function (req, res, next) {
  let regex = new RegExp("java", 'i')
  const user = await userModel.find({ category: { $all: [regex, "Vue"] } })
  res.send(user)
});
//  search in a specific date range mongoose
router.get('/finddate', async function (req, res, next) {
  let date1 = new Date("2024-03-11")
  let date2 = new Date("2024-03-13")
  const user = await userModel.find({ createddate: { $gte: date1, $lte: date2 } })
  res.send(user)
});
//  find if field exist mongoose
router.get('/findex', async function (req, res, next) {
  const user = await userModel.find({ category: { $exists: true } })
  res.send(user)
});
//  find specific length of a document mongoose
router.get('/findlen', async function (req, res, next) {
  try {
    const users = await userModel.find({
      nickname: { $exists: true },
      $expr: {
        $and: [
          { $gte: [{ $strLenCP: "$nickname" }, 13] },
          { $lte: [{ $strLenCP: "$nickname" }, 20] }
        ]
      }
    });
    res.send(users);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});
/* GET home page. */
router.get('/create', async function (req, res, next) {
  const createddata = await userModel.create({

    "username": "code_enthusiast",
    "nickname": "123456789123456",
    "description": "Dedicated to the art of coding and exploring new technologies.",
    "category": ["Java", "Spring", "Hibernate"]


  })
  res.send(createddata)
});

module.exports = router;
