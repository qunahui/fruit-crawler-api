const express = require("express");
const router = express.Router();

var list = [
  {
    id: 1,
    names: "Hydrogen",
    prices: 1050010,
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
  },
  {
    id: 6,
    names: "Carbon",
    prices: 20003,
  },
  {
    id: 7,
    names: "Nitrogen",
    prices: 20003,
  },
  {
    id: 8,
    names: "Oxygen",
    prices: 20003,
  },
  {
    id: 9,
    names: "Fluorine",
    prices: 20003,
  },
  {
    id: 10,
    names: "Neon",
    prices: 20003,
  },
  {
    id: 11,
    names: "Sodium",
    prices: 20003,
  },
  {
    id: 12,
    names: "Magnesium",
    prices: 20003,
  },
  {
    id: 13,
    names: "Aluminum",
    prices: 20003,
  },
  {
    id: 14,
    names: "Silicon",
    prices: 20003,
  },
  {
    id: 15,
    names: "Phosphorus",
    prices: 20003,
  },
  {
    id: 16,
    names: "Sulfur",
    prices: 20003,
  },

  {
    id: 17,
    names: "Chlorine",
    prices: 20003,
  },
  {
    id: 18,
    names: "Argon",
    prices: 20003,
  },
  {
    id: 19,
    names: "Potassium",
    prices: 20003,
  },
  {
    id: 20,
    names: "Calcium",
    prices: 20003,
  },
  {
    id: 21,
    names: "Scandium",
    prices: 20003,
  },
  {
    id: 22,
    names: "Titanium",
    prices: 20003,
  },
  {
    id: 23,
    names: "Vanadium",
    prices: 20003,
  },
  {
    id: 24,
    names: "Chromium",
    prices: 20003,
  },
  {
    id: 25,
    names: "Manganese",
    prices: 20003,
  },
  {
    id: 26,
    names: "Iron",
    prices: 20003,
  },
  {
    id: 27,
    names: "Cobalt",
    prices: 20003,
  },
  {
    id: 28,
    names: "Nickel",
    prices: 20003,
  },
  {
    id: 29,
    names: "Copper",
    prices: 20003,
  },
];

var pgnumber = 1;

router.post("/autocomplete", (req, res) => {
  query = req.body.queries;
  const searchoptions = list.filter((value) =>
    value.names.toLowerCase().includes(query.toLowerCase())
  );
  res.status(200).send({ data: searchoptions });
});

router.get("/:id", (req, res) => {
  res.status(200).send({ data: list });
});

router.get("/", (req, res) => {
  const { page, pageSize } = req.query;

  res.status(200).send({
    data: list.slice((page - 1) * pgSize, page * pageSize),
    pagination: {
      totalPages: Math.round(list.length / 10),
      totalDocs: list.length,
    },
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updateItem = req.body;
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
  const newItem = req.body;
  list = list.concat([
    {
      id: list.length + 1,
      ...newItem,
    },
  ]);

  res.status(201).send({
    data: newItem,
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).send({ data: list });
});

module.exports = router;
