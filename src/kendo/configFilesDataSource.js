import kendo from 'kendo-ui-web/scripts/kendo.data.min';

const configFiles = new kendo.data.DataSource({
  transport: {
    read: {
      url: process.env.apiBaseUrl + '/config-files',
      dataType: 'json',
      // beforeSend: (xhr) => {
      //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      // }
    },
  },
  schema: {
    data: (data) => {
      return data;
    }
  },
});

module.exports = configFiles;
