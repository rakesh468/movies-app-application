const asynchandler =(fn) =>async (...arg) => {
    try {
      await fn(...arg);
    } catch (error) {
      console.log(error);
    }
  };

  module.exports=asynchandler;