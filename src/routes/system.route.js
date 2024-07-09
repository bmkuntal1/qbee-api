const process = require('process');
const fs = require('fs');

const httpStatus = require('http-status');
const router = require('express').Router();

//info route
router.get('/info', async (req, res, next) => {
  try {
    const name = process.env.npm_package_name;
    const version = process.env.npm_package_version;
    const environment = process.env.NODE_ENV;
    res.status(httpStatus.OK).json({ name, environment, version });
  } catch (error) {
    next(error);
  }
});

//health check route
router.get('/health', async (req, res, next) => {
  try {
    res.status(httpStatus.OK).json({ status: 'UP' });
  } catch (error) {
    next(error);
  }
});

//error route
router.get('/error', async (req, res, next) => {
  try {
    throw new Error('This is a test error');
  } catch (error) {
    next(error);
  }
});

//logs route from logs folder
router.get('/logs', async (req, res, next) => {
  try {
    const {page, pageSize} = req.query;
    // read all files from logs folder
    let files = fs.readdirSync('logs');
    //paginate the file array
    if (page && pageSize) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      files = files.slice(start, end);
    }

    const totalPages = Math.ceil(files.length / pageSize);

    const data = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].endsWith('.log')) {
        continue;
      }
      let size = fs.statSync(`logs/${files[i]}`).size;
      size = (size / 1024).toFixed(2);
      const name = files[i];
      const date = fs.statSync(`logs/${files[i]}`).mtime;

      let health = {};

      if (req.query.showHealth === 'true') {
        const content = fs.readFileSync(`logs/${files[i]}`, 'utf8');
        health = {
          warnings: content.match(/Warning:/g) ? content.match(/Warning:/g).length : 0,
          errors: content.match(/Error:/g) ? content.match(/Error:/g).length : 0
        };

        if(health.errors == 0 && health.warnings == 0) {
          health.status = 'good';
        }
      }

      data.push({ name, size, date, health });
    }

    res.status(httpStatus.OK).json({ data, total: data.length, totalPages, page, pageSize});
  } catch (error) {
    next(error);
  }
});

//log file route
router.get('/logs/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const content = fs.readFileSync(`logs/${name}.log`, 'utf8');
    res.status(httpStatus.OK).send({ content });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
