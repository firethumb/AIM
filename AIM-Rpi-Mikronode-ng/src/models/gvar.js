var sysvar = (function(){
  priwlcIP = 0;
  function setwlcIP(val) {
    priwlcIP = val;
  };
  function getwlcIP() {
    return priwlcIP;
  };
  return {
    wlcIP: {
      set:function(val) {
        setwlcIP(val);
      },
      get:function(){
        return getwlcIP();
      }
    }
  }
})();

var guivar = (function(){
  priGuiVarSkin = 0;
  function setGuiVar(val) {
    priGuiVarSkin = val;
  };
  function getGuiVar() {
    return priGuiVarSkin;
  };
  return {
    skin: {
      set:function(val) {
        setGuiVar(val);
      },
      get:function(){
        return getGuiVar();
      }
    }
  }
})();
var gvar = (function() {
  var rpiIP = "rpiIP0";
  var wlcIP = "wlcIP0";
  var rpiMEM = "rpiMEM0";
  var wlcMEM = "wlcMEM0";
  var rpiCPU = "rpiCPU0";
  var wlcCPU = "wlcCPU0";
  var lastREC = "lastREC";
  var income = 0;
  var uptime = "lastBoot";
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
  function setrpiCPU(val) {
    rpiCPU = val;
  };
  function getrpiCPU() {
    return rpiCPU;
  };
  function setwlcCPU(val) {
    wlcCPU = val;
  };
  function getwlcCPU() {
    return wlcCPU;
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
  function setuptime(val) {
    uptime = val;
  };
  function getuptime() {
    return uptime;
  };
  function setIncome(val) {
    income = val;
  };
  function getIncome() {
    return income;
  };
  function setlastREC(val) {
    lastlogin = val;
  };
  function getlastREC() {
    return lastREC;
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
    rpiIP: {
      set:function(val) {
        setrpiIP(val);
      },
      get:function(){
        return getrpiIP();
      }
    },
    wlcIP: {
      set:function(val) {
        setwlcIP(val);
      },
      get:function(){
        return getwlcIP();
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
    rpiCPU: {
      set:function(val) {
        setrpiCPU(val);
      },
      get:function(){
        return getrpiCPU();
      }
    },
    wlcCPU: {
      set:function(val) {
        setwlcCPU(val);
      },
      get:function(){
        return getwlcCPU();
      }
    },
    lastREC: {
      set:function(val) {
        setlastREC(val);
      },
      get:function(){
        return getlastREC();
      }
    },
    uptime: {
      set:function(val) {
        setuptime(val);
      },
      get:function(){
        return getuptime();
      }
    },
    income: {
      set:function(val) {
        setIncome(val);
      },
      get:function(){
        return getIncome();
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
})();
module.exports = {gvar:gvar,guivar:guivar,sysvar:sysvar}
