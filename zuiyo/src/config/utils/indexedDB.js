(function IIFE () {
  if (!window.indexedDB) {
    alert('your browser is not support indexedDB!')
    return
  }
  var request = window.indexedDB.open('person', 1)
  var db
  request.onerror = function (event) {
    console.log('数据库打开报错')
  }
  request.onsuccess = function (event) {
    db = request.result
    console.log('数据库打开成功')
  }
  request.onupgradeneeded = function (event) {
    console.log('onupgradeneeded...')
    db = event.target.result
    var objectStore = db.createObjectStore('person', { keyPath: 'id' })
    objectStore.createIndex('name', 'name', { unique: false })
    objectStore.createIndex('email', 'email', { unique: true })
  }
  function add (obj) {
    var request = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .add(obj)
    // .add({ id: 1, name: 'ccy', age: 18, email: 'test@example.com' });

    request.onsuccess = function (event) {
      console.log('数据写入成功')
    }
    request.onerror = function (event) {
      console.log('数据写入失败')
    }
  }
  function read (index) {
    var transaction = db.transaction(['person'])
    var objectStore = transaction.objectStore('person')
    var request = objectStore.get(index)
    request.onerror = function (event) {
      console.log('事务失败')
    }

    request.onsuccess = function (event) {
      if (request.result) {
        console.log('Name: ' + request.result.name)
        console.log('Age: ' + request.result.age)
        console.log('Email: ' + request.result.email)
      } else {
        console.log('未获得数据记录')
      }
    }
  }
  function readAll () {
    var objectStore = db.transaction('person').objectStore('person')
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor) {
        console.log('Id: ' + cursor.key)
        console.log('Name: ' + cursor.value.name)
        console.log('Age: ' + cursor.value.age)
        console.log('Email: ' + cursor.value.email)
        cursor.continue()
      } else {
        console.log('没有更多数据了！')
      }
    }
  }
  function update (obj) {
    var request = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .put(obj)
    // .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

    request.onsuccess = function (event) {
      console.log('数据更新成功')
    }

    request.onerror = function (event) {
      console.log('数据更新失败')
    }
  }
  function remove (index) {
    var request = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .delete(index)

    request.onsuccess = function (event) {
      console.log('数据删除成功')
    }
  }
  window.IndexedDb = {
    add: add,
    read: read,
    readAll: readAll,
    update: update,
    remove: remove
  }
})()
