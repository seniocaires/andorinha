const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const HttpException = require('../../exceptions/httpException');
const pastaDownload = './tmp/downloads';

const info = async (req, res, next) => {
  try {
    const url = req.query.url;
    console.info('/info', url);

    validarUrl(url);

    const child = spawn('youtube-dl', ['--dump-json', req.query.url]);

    let data = '';
    for await (const chunk of child.stdout) {
      data += chunk;
    }

    let error = '';
    for await (const chunk of child.stderr) {
      console.error('stderr chunk: ' + chunk);
      error += chunk;
    }

    if (error) {
      throw new HttpException(500, `Ocorreu um erro ao fazer o download. (${req.query.url}), ${error}`);
    }
    const exitCode = await new Promise((resolve, reject) => {
      child.on('close', resolve);
    });

    if (exitCode) {
      throw new HttpException(500, `Ocorreu um erro ao fazer o download. ${exitCode}. (${req.query.url}), ${error}`);
    }

    res.json({ payload: JSON.parse(data) });
  } catch (err) {
    next(err);
  }
};

const download = async (req, res, next) => {
  try {
    const url = req.query.url;
    const format = req.query.format;
    console.info('/download', url, format);

    if (!fs.existsSync(pastaDownload)) {
      fs.mkdirSync(pastaDownload, { recursive: true });
    }

    const unico = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const outputFile = path.join(pastaDownload, `youtube-${unico}-${format}`);

    console.log(outputFile)
    const child = spawn('youtube-dl', ['-o', outputFile, '-f', format, req.query.url]);

    let data = '';
    for await (const chunk of child.stdout) {
      data += chunk;
    }

    let error = '';
    for await (const chunk of child.stderr) {
      console.error('stderr chunk: ' + chunk);
      error += chunk;
    }

    if (error) {
      throw new HttpException(500, `Ocorreu um erro ao fazer o download. (${req.query.url}), ${error}`);
    }
    const exitCode = await new Promise((resolve, reject) => {
      child.on('close', resolve);
    });

    if (exitCode) {
      throw new HttpException(500, `Ocorreu um erro ao fazer o download. ${exitCode}. (${req.query.url}), ${error}`);
    }

    res.download(path.join(pastaDownload, `youtube-${unico}-${format}`));
  } catch (err) {
    next(err);
  }
};

const validarUrl = (url) => {
  if (!url) {
    throw new HttpException(400, 'Informe a URL');
  }

  // TODO: Validar outras URLs do Youtube
  if (!url.startsWith('https://www.youtube.com/watch')) {
    throw new HttpException(400, 'Informe uma URL do Youtube');
  }
};
module.exports = { info, download };
