import React from 'react';
import Upload from '../../../widgets/upload';
import DataGrid, { filterMenuInit } from '../../../widgets/dataGrid';
import configFiles from '../../../../kendo/configFilesDataSource';

const ConfigFiles = React.createClass({
  render() {
    return (
      <section className="admin-config-file-upload">
        <Upload
          name="configFile"
          options={{
            showFileList: false,
            async: {
              saveUrl: process.env.apiBaseUrl + '/config-files',
              autoUpload: true,
            },
            // upload: (e) => {
            //   var xhr = e.XMLHttpRequest;
            //   if (xhr) {
            //     xhr.addEventListener('readystatechange', function (e) {
            //       if (xhr.readyState == 1) {
            //         xhr.setRequestHeader('Authorization', 'Bearer ' + datacontext.authToken());
            //       }
            //     });
            //   }
            // },
            localization: {
              select: 'Click here to upload Device Config File'
            },
            error: (e) => {
              var resp = e.XMLHttpRequest;
              console.log(resp);

              this.refs.grid.read();
            },
            success: (e) => {
              this.refs.grid.read();
            }
          }}/>
        <DataGrid
          ref="grid"
          options={{
            dataSource: configFiles,
            columns: [{
              field: 'fileName',
              template: '<a class="config-file-link" data-file-name="#=fileName#" href="' + process.env.configFilesUrl + '#=fileName#" target="_blank" download="#=fileName#">#=fileName#</a>',
              title: 'Config File Name',
              width: '200px'
            }]
          }}
          offset={285} />
      </section>
    )
  },
});

module.exports = ConfigFiles;
