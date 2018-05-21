module.exports = function () {

  function equals(value) {
    return this._id === value;
  }

  function setProp(id, name, extras) {
    var props = {_id: id, name: name, equals: equals};
    if (extras) {
      for (var p in extras) {
        props[p] = extras[p];
      }
    }

    if ([true, false].indexOf(props['translate']) === -1) {
      props['translate'] = true;
    }
    return {
      enumerable: true,
      writable: false,
      configurable: false,
      value: props
    };
  }

  var types = { };

  const BasicType = Object.create({}, {
    asArray: {
      enumerable: false,
      configurable: false,
      get: function () {
        var a = [];
        for (var p in this) {
          if (this.hasOwnProperty(p)) {
            a.push(this[p]);
          }
        }
        return a;
      }
    },
    findById: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: function (id) {
        var id = /^[\d]+$/.test(id) ? parseInt(id) : id;
        for (var p in this) {
          if (this.hasOwnProperty(p) && this[p]['_id'] === id) {
            return this[p];
          }
        }
        return null;
      }
    }
  });

  types.Contract = Object.create(BasicType, {
    REQUEST: setProp(1, 'Requisições'),
    TIME_MANUAL: setProp(2, 'Tempo / manual'),
    TIME_AUTOMATIC: setProp(3, 'Tempo / automático')
  });


  return types;
}();
