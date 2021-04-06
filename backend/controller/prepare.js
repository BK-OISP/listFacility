const FMType = require("../model/fm-Type");
const FMBigGroup = require("../model/fm-BigGroup");
const FM_Unit = require("../model/fm-Unit");

const addFMType = async (req, res, next) => {
  const data = req.body.table;

  try {
    await Promise.all(
      data.map(async (item) => {
        const dataType = new FMType(item);
        await dataType.save();
      })
    );
    return res.json({ message: "Import Complete" });
  } catch (error) {
    return res.json({ error });
  }
};

const addFMBigGroup = async (req, res, next) => {
  const data = req.body.table;

  try {
    let check = await Promise.all(
      data.map(async (item) => {
        const dataSave = new FMBigGroup(item);
        await dataSave.save();
        return dataSave;
      })
    );
    return res.json({ message: "Import Complete" });
  } catch (error) {
    return res.json({ error });
  }
};

const addUnitGroup = async (req, res, next) => {
  const data = req.body.table;
  try {
    await Promise.all(
      data.map(async (item) => {
        const unit = new FM_Unit(item);
        return await unit.save();
      })
    );
    return res.json({ message: "ok" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addFMType,
  addFMBigGroup,
  addUnitGroup,
};
