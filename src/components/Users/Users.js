import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModel from './UserModel';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }
  function pageChangeHandler(offIndex) {
    console.log('下标是%s', offIndex);
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { offIndex },
    }));
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  const columns = [
    {
      title: 'certName',
      dataIndex: 'certName',
      key: 'certName',
      render: certName => <a href="">{certName}</a>,
    }, {
      title: '类型',
      dataIndex: 'category',
      key: 'category',
      render: category => <a href="">{category}</a>,
    }, {
      title: 'certConfirm',
      dataIndex: 'certConfirm',
      key: 'certConfirm',
      render: certConfirm => <a href="">{certConfirm}</a>,
    }, {
      title: 'certNo',
      dataIndex: 'certNo',
      key: 'certNo',
      render: certNo => <a href="">{certNo}</a>,
    }, {
      title: 'isCredited',
      dataIndex: 'isCredited',
      key: 'isCredited',
      render: isCredited => <a href="">{isCredited}</a>,
    }, {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModel record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModel>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModel record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModel>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

// export default Users;
export default connect(mapStateToProps)(Users);
