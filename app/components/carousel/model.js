function settingUpOptions(data) {
  data.options === null ? (data.options = 'slideshow') : data.options;
}

module.exports.render = function(uri, data, locals) {
  settingUpOptions(data);
  console.log('Data inside carousel >>>>>>>> ', data);

  return data;
};
