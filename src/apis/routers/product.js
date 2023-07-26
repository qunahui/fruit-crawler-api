const jwt = require("jsonwebtoken");
const router = express.Router();
const axios = require("axios");
const CustomError = require("../utils/error");
const puppeteer = require("puppeteer");
const fs = require("fs");
const spawn = require("child_process").spawn;
const bodyParser = require("body-parser");

var list = [
  {
    id: 1,
    names:
      "How many honest words have suffered corruption since Chaucer's days!",
    prices: 1050010,
    stores: "lazada",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 2,
    names:
      "Heliumasfjdlsjfljdsjflkdsjf;ljsaljlkajsflkjdlkjfoijeoinjecijeoinfeijoiejroijewoirjeoijrwoiewj",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 3,
    names:
      "Lithiumjajfoaijmejaoijdajlejljfoajoijsoifjjslfkjljdskfjlsakjfoi3ni3oidnneojiofjoajdlkjflajf;ljfdl;a",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 4,
    names:
      "Berylliumjlkajflajslfjlsjlkf;akljlkjla;;lsdkjfa;lsdjfka;;lkjk;alkdjkf;alfdkfjk;alkj;alskfj;alsjfa;jlksj;ajf",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 5,
    names:
      "Borondkljf;skjkajfa;lskj;flksjdfiemnfoiemne9ene9ejjljfoijljsalkjs;ajlksjdl;akdja;dljfljldsjfl;jsljflsjk;ljak;l",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 2,
    names: "Helium",
    prices: 20003,
  },
  {
    id: 3,
    names: "Lithium",
    prices: 20003,
  },
  {
    id: 4,
    names: "Beryllium",
    prices: 20003,
  },
  {
    id: 5,
    names: "Boron",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
    stores: "shopee",
  },
  {
    id: 8,
    names: "Oxygen",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 9,
    names: "Fluorine",
    prices: 20003,

    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 10,
    names: "Neon",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 11,
    names: "Sodium",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 12,
    names: "Magnesium",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 13,
    names: "Aluminum",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 14,
    names: "Silicon",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 15,
    names: "Phosphorus",
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 16,
    names: "Sulfur",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },

  {
    id: 17,
    names: "Chlorine",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 18,
    names: "Argon",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 19,
    names: "Potassium",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 20,
    names: "Calcium",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 21,
    names: "Scandium",
    prices: 20003,
    stores: "lazada",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 22,
    names: "Titanium",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 23,
    names: "Vanadium",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 24,
    names: "Chromium",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 25,
    names: "Manganese",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 26,
    names: "Iron",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 27,
    names: "Cobalt",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 28,
    names: "Nickel",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
  {
    id: 29,
    names: "Copper",
    prices: 20003,
    stores: "shopee",
    links:
      "https://lzd-img-global.slatic.net/g/p/7c55987a06c8fbc322ba1634b457ede0.jpg_400x400q75.jpg_.webp",
  },
];

var loggedIn = false;
var counter = 0;
var pgnumber = 1;

const cors = require("cors");

router.use(cors());

//function to scrape websites - id is the file that will get withdrawn, array list contains the outputs and the file name,s query is the input from the UI,
//endFunction validates whether all files have been evaluated
//currently only partially evaluating the code
async function usePythonScraping(id, array, query, checkIfComplete, finallist) {
  let links = "";
  console.log(array[id][0]);
  let pythonProcess = await spawn("python", [
    array[id][0],
    "first_function",
    query,
  ]);
  pythonProcess.stdout.on("data", (data) => {
    const test = data.toString();
    console.log("help");
    console.log(test);
    links = test;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString("utf8"));
  });
  pythonProcess.on("exit", (code) => {
    links = links
      .replaceAll("\r", "")
      .replaceAll("\n", "")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll("},", "}><><><")
      .replaceAll("'", '"');
    let holdinglist = links.split("><><><");
    for (let i = 0; i < holdinglist.length; i++) {
      holdinglist[i] = JSON.parse(holdinglist[i]);
    }
    array[id][1] = holdinglist;
    checkIfComplete(finallist);
    return array[id][1];
  });
}

const userList = [
  { username: "anmol", displayName: "Anmol Dash", password: "dash" },
  { username: "huy", displayName: "Quang Huy", password: "123123" },
];

const findUser = (user) => {
  const { username, password } = user || {};
  const matchedUser = userList.find((item) => item.username === username);

  if (!matchedUser) {
    throw new Error("User doesn't exist");
  }

  if (matchedUser && password !== matchedUser.password) {
    throw new Error("Username or password is incorrect");
  }

  return matchedUser;
};

router.get("/me", (req, res) => {
  console.log(req.headers);
});

router.post("/jwtlogin", async (req, res) => {
  try {
    const matchedUser = findUser(req.body);
    console.log(matchedUser);
    const token = jwt.sign(
      { username: matchedUser.username },
      "jwqoid@#@!#@!ss",
      { expiresIn: "10000s" }
    );
    console.log(token);
    res.status(200).send({ token });
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: { message: e.message } });
  }
});

//called whenever user searches for an item
router.post("/listeditor", async (req, res) => {
  async function checkIfComplete(finallist) {
    let checkArray = true;
    for (let i = 0; i < array.length; i++) {
      if ((await array[i][1][0]) == "placeholder_value") {
        checkArray = false;
      }
    }
    if (checkArray) {
      for (let i = 0; i < array.length; i++) {
        finallist = finallist.concat(array[i][1]);
      }
      list = finallist;
      res.status(200).send({ data: finallist });
    }
  }
  const query = await req.body.queries;
  console.log(query);
  finallist = [];
  let v = "";
  array = [
    ["lazadascraper.py", ["placeholder_value"]],
    ["shopeescraper.py", ["placeholder_value"]],
  ];
  for (let i = 0; i < array.length; i++) {
    await usePythonScraping(i, array, query, checkIfComplete, finallist);
  }
});

router.get("/:id", (req, res) => {
  res.status(200).send({ data: list });
});

router.get("/", (req, res) => {
  const { page, pageSize } = req.query;
  console.log("Death hath a thousand doors to let out life");
  console.log(list.slice((page - 1) * pageSize, page * pageSize));
  res.status(200).send({
    data: list.slice((page - 1) * pageSize, page * pageSize),
    pagination: {
      totalPages: Math.round(list.length / 10),
      totalDocs: list.length,
    },
  });
});

router.post("/autocomplete", (req, res) => {
  try {
    jwt.verify(req.body.headers.Authentication, "jwqoid@#@!#@!ss");
    const query = req.body.queries;
    const searchoptions = Array(
      list.filter((value) =>
        value.names.toLowerCase().includes(query.toLowerCase())
      )
    );
    res.status(200).send({ searchoptions });
  } catch (e) {
    console.log(e);
    res.status(400).send({});
  }
});

router.get("/jwtvalidation", (req, res) => {
  jwt.verify(req.body.headers.Authentication, "jwqoid@#@!#@!ss");
  return true;
});

router.put("/:id", (req, res) => {
  jwt.verify(req.body.headers.Authentication, "jwqoid@#@!#@!ss");
  const { id } = req.params;
  const updateItem = req.body.queries;
  list = [...list].map((item) => {
    if (item.id?.toString() === id?.toString()) {
      return {
        ...item,
        ...updateItem,
      };
    }
    return item;
  });
  res.status(204).send({});
});

router.post("/", (req, res) => {
  jwt.verify(req.body.headers.Authentication, "jwqoid@#@!#@!ss");
  const newItem = req.body.queries;
  list = list.concat([
    {
      id: list.length + 1,
      ...newItem,
    },
  ]);

  res.status(201).send({
    newItem,
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).send({ data: list });
});

module.exports = router;
