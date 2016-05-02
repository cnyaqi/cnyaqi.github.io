angular.module('indexdb', [])
  .factory('IndexdbJs', ['$ionicPopup', function($ionicPopup) {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;

    // 定义数据库的基本信息
    var db = {
      dbName: 'aptdb', // 数据库名称
      dbVersion: 2046, // 数据库版本, 小数会四舍五入
      dbInstance: {}, // ?

      errorHandler: function(error) {
        console.log('error' + error.target.error.message);
      },
      // 打开数据库i函数
      open: function(func, fail) {
        var dbContent = window.indexedDB.open(db.dbName, db.dbVersion); // 创建或者连接数据库

        // 当数据库创建成功之后, 除非数据库版本发生改变, 否则此函数只执行一次, 这个函数中写创建表的方法
        // 判断数据库版本号是够更新了（创建和修改表结构在这里操作）
        dbContent.onupgradeneeded = db.upgrade;

        // 数据库创建失败
        dbContent.onerror = db.errorHandler;

        // 数据库创建成功
        dbContent.onsuccess = function(e) {
          db.dbInstance = dbContent.result;
          db.dbInstance.onerror = fail;
          func();
        };
      },
      // 判断数据库版本号是够更新了（创建和修改表结构在这里操作）
      upgrade: function(e) {
        var _db = e.target.result,
          names = _db.objectStoreNames;
        var name = 'cart';
        if (!names.contains(name)) {
          _db.createObjectStore(
            name, {
              keyPath: 'goodsId',
              autoIncrement: false
            });
        }
      },
      // 获得表
      getObjectStore: function(objectStoreName, mode) {
        var txn, store;
        mode = mode || 'readonly';
        txn = db.dbInstance.transaction([objectStoreName], mode); // 创建事务

        store = txn.objectStore(objectStoreName); // 获得表
        return store;
      },
      // 添加数据
      add: function(objectStoreName, data, success, fail) {
        db.open(function() {
          var store, req, mode = 'readwrite',
            store = db.getObjectStore(objectStoreName, mode),
            req = store.add(data);
          req.onsuccess = success;
          req.onerror = fail;
        }, fail);
      },
      // 修改数据
      update: function(objectStoreName, data, success, fail) {
        db.open(function() {
          var store, req, mode = 'readwrite';
          store = db.getObjectStore(objectStoreName, mode);
          req = store.put(data);
          req.onsuccess = success;
          req.onerror = fail;
        }, fail);
      },
      // 表中的所有的数据
      getAll: function(objectStoreName, success, fail) {
        db.open(function() {
          var store = db.getObjectStore(objectStoreName),
            cursor = store.openCursor(), // 游标
            data = [];
          cursor.onsuccess = function(e) {
            var result = e.target.result;
            if (result && result !== null) {
              data.push(result.value);
              result.continue();
            } else {
              success(data);
            }
          };
          cursor.onerror = fail;
        }, fail);
      },
      // 通过key 获得一条数据
      get: function(id, objectStoreName, success, fail) {
        db.open(function() {
          var store = db.getObjectStore(objectStoreName), // 获得表
            req = store.get(id); // 请求
          req.onsuccess = success;
          req.onerror = fail;
        });
      },
      // 删除所有的数据
      deleteAll: function(objectStoreName, success, fail) {
        db.open(function() {
          var mode, store, req;
          mode = 'readwrite';
          store = db.getObjectStore(objectStoreName, mode);
          req = store.clear(); // 清空所有的数据
          req.onsuccess = success;
          req.onerror = fail;
        }, fail);
      }

    }
    return db;

  }]);
