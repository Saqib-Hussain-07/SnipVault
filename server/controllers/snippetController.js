const { nanoid } = require('nanoid');
const Snippet = require('../models/Snippet');

exports.getAll = async (req, res, next) => {
  try {
    const { search, tag, language } = req.query;
    const query = { owner: req.user.id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }
    if (tag) query.tags = { $in: [tag] };
    if (language) query.language = language;

    const snippets = await Snippet.find(query).sort({ updatedAt: -1 });
    res.json(snippets);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, code, language, tags, isPublic } = req.body;
    if (!title || !code || !language)
      return res.status(400).json({ message: 'Title, code, and language are required' });

    const snippet = await Snippet.create({
      title, code, language,
      tags: tags || [],
      isPublic: isPublic || false,
      shareId: isPublic ? nanoid(10) : undefined,
      owner: req.user.id
    });
    res.status(201).json(snippet);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, owner: req.user.id });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json(snippet);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { title, code, language, tags, isPublic } = req.body;
    const snippet = await Snippet.findOne({ _id: req.params.id, owner: req.user.id });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

    snippet.title = title ?? snippet.title;
    snippet.code = code ?? snippet.code;
    snippet.language = language ?? snippet.language;
    snippet.tags = tags ?? snippet.tags;

    if (isPublic !== undefined) {
      snippet.isPublic = isPublic;
      if (isPublic && !snippet.shareId) snippet.shareId = nanoid(10);
      if (!isPublic) snippet.shareId = undefined;
    }

    await snippet.save();
    res.json(snippet);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json({ message: 'Snippet deleted' });
  } catch (err) { next(err); }
};

exports.getPublic = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOne({ shareId: req.params.shareId, isPublic: true });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found or not public' });
    res.json(snippet);
  } catch (err) { next(err); }
};
