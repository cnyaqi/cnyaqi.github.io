angular.module('indexdbjs', [])
  .factory('IndexdbJs', function() {

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;

    var db = {
      dbName: 'adb-2016',
      dbVersion: 1994, // 如果是小数的话会自动四舍五入, 版本号不能变低
      dbInstance: {}, // 这里存的是链接成功后的result
      // 错误处理
      errorHandler: function(error) {
        console.log('error: ' + error.target.error.message);
      },
      // 创建数据库
      open: function(func, fail) {
        var dbContent = window.indexedDB.open(db.dbName, db.dbVersion);
        dbContent.onupgradeneeded = db.upgrade;
        dbContent.onerror = db.errorHandler;
        dbContent.onsuccess = function(e) { // 成功后会自动回调
          db.dbInstance = dbContent.result;
          db.dbInstance.onerror = fail;
          func();
        }
      },
      // 第一次或者数据库更新版本会走这里
      upgrade: function(e) {
        var _db = e.target.result,
          names = _db.objectStoreNames;
        // 此处可以创建多张表
        var name = 'cart';
        if (!names.contains(name)) {
          _db.createObjectStore(name, {
            keyPath: 'goodsId',
            autoIncrement: false
          });
        }
      },
      // 获得表
      getObjectStore: function(objectStoreName, mode) {
        var store, txn;
        mode = mode || 'readonly';
        txn = db.dbInstance.transaction([objectStoreName], mode);
        store = txn.objectStore(objectStoreName);
        return store;
      },
      // 添加一条数据
      add: function(objectStoreName, data, success, fail) {
        db.open(function() {
          var store, name, req, mode = 'readwrite';
          console.log(objectStoreName);
          store = db.getObjectStore(objectStoreName, mode);
          req = store.add(data);
          req.onerror = fail;
          req.onsuccess = success;
        }, fail);
      },
      // 更新数据
      update: function(objectStoreName, data, success, fail) {
        db.open(function() {
          var store, req, mode = 'readwrite';
          store = db.getObjectStore(objectStoreName, mode);
          req = store.put(data);
          req.onsuccess = success;
          req.onerror = fail;
        }, fail);
      },
      getAll: function(objectStoreName, success, fail) {
        db.open(function() {
          var store = db.getObjectStore(objectStoreName),
            cursor = store.openCursor(),
            data = [];

          cursor.onsuccess = function(e) {
            var result = e.target.result;
            if (result && result !== null) {
              data.push(result.value);
              result.continue();
            } else {
              console.log(data);
              success(data);
            }
          };
          cursor.onerror = fail;
        }, fail);
      },
      // 获得一条数据
      get: function(id, objectStoreName, success, fail) {
        db.open(function() {
          var store, req;
          store = db.getObjectStore(objectStoreName, 'readwrite');
          req = store.get(id);
          req.onsuccess = function(e) {
            success(e.target.result);
          };
          req.onerror = fail;
        }, fail);
      },
      // 删除一条数据
      delete: function(objectStoreName, id, success, fail) {
        console.log(objectStoreName);
        db.open(function() {
          var store, req;
          store = db.getObjectStore(objectStoreName, 'readwrite');
          req = store.delete(id);
          req.onsuccess = success;
          req.onerror = fail;
        });
      },
      clearAll: function(objectStoreName, success, fail) {
        db.open(function() {
          var store, req;
          store = db.getObjectStore(objectStoreName, 'readwrite');
          req = store.clear();
          req.onsuccess = sunccess;
          req.onerror = fail;
        }, fail);
      }
    }

    return db;

  });
