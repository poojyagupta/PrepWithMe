// utils/interleaveTopics.js

function interleaveTopics(topicsMap) {
  const keys = Object.keys(topicsMap);
  const topicLists = keys.map((k) => [...topicsMap[k]]);
  const result = [];

  let moreTopics = true;
  while (moreTopics) {
    moreTopics = false;

    for (let i = 0; i < topicLists.length; i++) {
      if (topicLists[i].length > 0) {
        result.push({ subject: keys[i], topic: topicLists[i].shift() });
        moreTopics = true;
      }
    }
  }

  return result;
}

module.exports = interleaveTopics;
