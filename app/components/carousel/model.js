function settingUpOptions(data) {
  data.options === null ? (data.options = 'slideshow') : data.options;
}

module.exports.render = function(uri, data, locals) {
  settingUpOptions(data);

  return data;
};
