import React from 'react';
import DataGrid, { clientEditor, filterMenuInit } from '../../../widgets/dataGrid';
import users from '../../../../kendo/usersDataSource';

const Users = React.createClass({
  render() {
    return (
      <section>
        <DataGrid options={{
          dataSource: users,
          toolbar: ['create'],
          editable: 'popup',
          resizable: true,
          filterable: true,
          filterMenuInit: filterMenuInit,
          sortable: {
            mode: 'multiple',
          },
          pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
          },
          columns: [{
            field: 'clientName',
            editor: clientEditor,
            title: 'Client Name',
            width: '200px',
            filterable: true,
            sortable: true
          },
          {
            field: 'loginId',
            title: 'Login ID',
            width: '130px',
            filterable: true,
            sortable: true
          },
          {
            field: 'userName',
            title: 'Full Name',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'email',
            title: 'Email',
            width: '210px',
            filterable: true,
            sortable: true
          },
          {
            command: ['edit'],
            title: ' ',
            width: 90,
            resizable: false
          }]
        }} />
      </section>
      )
    },

    detailInit(e) {

    }
  });

  module.exports = Users;
