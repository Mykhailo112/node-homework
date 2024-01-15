import Contact from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createAt -updateAt", {
    skip,
    limit,
  }).populate("owner", "username");

  res.json(result);
};

const getById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findById({ _id: owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate({ _id: owner }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ _id: owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json({ message: "Delete success" });
};

const updateFavorite = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  if (!req.body) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate({ _id: owner }, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

export default {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
