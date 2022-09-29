const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`).config();

let port = process.env.PORT || 3000;

const Run = async () => {
  try {
    app.listen(port, console.log(`listening to ${port}`));
    const me = await mongoose.connect(process.env.uri);
    console.log(`connected to DB`);
    const schema = mongoose.Schema({
      name: Number,
    });
    const model = mongoose.model(`number`, schema);
    const schema2 = mongoose.Schema({
      input: String,
    });
    const model2 = mongoose.model(`input`, schema2);
    // module.exports = model;
    const automation = require(`./auto`);
    app.use(express.static(`public`));
    app.use(express.json());

    app.put(`/shuffles/:id`, async (req, res) => {
      try {
        const update = await model2.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(`Sent successfully`);
      } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
      }
    });

    app.put(`/shuffle/:id`, async (req, res) => {
      if (!req.body.name) {
        return res
          .status(400)
          .json({ msg: `INPUT must be numbers not alphabets ` });
      }
      await model.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ msg: `Successfully updated` });
    });

    app.get(`/shuffles`, async (req, res) => {
      const doc = await model.find({});
      res.status(200).json({ msg: doc });
    });
    app.get(`/shuffle`, async (req, res) => {
      const doc = await model2.find({});
      res.status(200).json({ msg: doc });
    });
  } catch (error) {
    console.log(error);
  }
};

Run();
