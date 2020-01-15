const amphoraSearch = require('amphora-search');
const { getComponentName } = require('clayutils');

amphoraSearch.subscribe('save').through(handlerSave);

function handlerSave(stream) {
  console.log(stream);
  return (
    stream
      .merge()
      // .each(op => {
      // 	console.log("op: ", op);
      // 	return op;
      // })
      .filter(op => getComponentName(op.key) === 'recipe')
      .each(console.log)
  );
  // .filter(op => {
  // 	console.log("This is the OP that is a Recipe >>>>> ",getComponentName(op.key) === "recipe");
  // 	// return getComponentName(op.key) === "recipe";

  // });
}

function handlerStream(stream) {
  return stream.collect().map();
}
