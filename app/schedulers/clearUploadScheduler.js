const schedule = require('node-schedule');
const pastaUpload = './tmp/uploads';
const path = require('path');
const fs = require('fs');

/**
 * Schedule para limpar uploads antigos.
 * O schedule irá apagar arquivos da pasta
 * uploads que foram criados à mais de 30 minutos
 */
module.exports = () => {
  schedule.scheduleJob('10 * * * *', async function () {
    // Roda a cada hora no minuto 10

    console.info('Rodando schedule: Limpar uploads.');

    if (fs.existsSync(pastaUpload)) {
      fs.readdirSync(pastaUpload).forEach((arquivo) => {
        fs.stat(path.join(pastaUpload, arquivo), function (erroStat, stat) {
          let dataLimite, dataAtual;
          if (erroStat) {
            console.error(erroStat);
          }

          dataAtual = new Date().getTime();
          dataLimite = new Date(stat.ctime).getTime() + 1800000;

          if (dataAtual > dataLimite) {
            fs.unlink(path.join(pastaUpload, arquivo), function (erroApagarArquivo) {
              if (erroApagarArquivo) {
                console.error(erroApagarArquivo);
              }
            });
          }
        });
      });
    }
  });
};
