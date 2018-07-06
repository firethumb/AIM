module.exports.gvardashboard = function() {
  var rpiIP = "rpiIP0";
  var wlcIP = "wlcIP0";
  var rpiCPUTemp = "rpiCPUTemp0";
  var wlcCPUTemp = "wlcCPUTemp0";
  var rpiMEM = "rpiMEM0";
  var wlcMEM = "wlcMEM0";
  var lastlogin = "lastlogin";
  var vouchers = [];

  function setrpiIP(val) {
    rpiIP = val;
  };
  function getrpiIP() {
    return rpiIP;
  };
  function setwlcIP(val) {
    wlcIP = val;
  };
  function getwlcIP() {
    return wlcIP;
  };
  function setrpiCPUTemp(val) {
    rpiCPUTemp = val;
  };
  function getrpiCPUTemp() {
    return rpiCPUTemp;
  };
  function setwlcCPUTemp(val) {
    wlcCPUTemp = val;
  };
  function getwlcCPUTemp() {
    return wlcCPUTemp;
  };
  function setrpiMEM(val) {
    rpiMEM = val;
  };
  function getrpiMEM() {
    return rpiMEM;
  };
  function setwlcMEM(val) {
    wlcMEM = val;
  };
  function getwlcMEM() {
    return wlcMEM;
  };
  function setlastlogin(val) {
    lastlogin = val;
  };
  function getlastlogin() {
    return lastlogin;
  };
  function setvouchers(val) {
    vouchers = null;
    vouchers = val;
  };
  function getvouchers() {
    return vouchers;
  };
  function pushvouchers(val) {
    if (val){
      vouchers.push(val);
      return 0;
    }else { return -1; };
  }
  return {
    rpiIP: 'f',
    wlcIP: {
      set:function(val) {
        setwlcIP(val);
      },
      get:function(){
        return getwlcIP();
      }
    },
    rpiCPUTemp: {
      set:function(val) {
        setrpiCPUTemp(val);
      },
      get:function(){
        return getrpiCPUTemp();
      }
    },
    wlcCPUTemp: {
      set:function(val) {
        setwlcCPUTemp(val);
      },
      get:function(){
        return getwlcCPUTemp();
      }
    },
    rpiMEM: {
      set:function(val) {
        setrpiMEM(val);
      },
      get:function(){
        return getrpiMEM();
      }
    },
    wlcMEM: {
      set:function(val) {
        setwlcMEM(val);
      },
      get:function(){
        return getwlcMEM();
      }
    },
    vouchers:{
      set:function(val) {
        setvouchers(val);
      },
      get:function(){
        return getvouchers();
      },
      push:function(val){
        return pushvouchers(val);
      }
    }
  };
}();
