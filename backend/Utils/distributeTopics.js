function distributeTopics(topicsmap, totalDays) {
  //topicsmap is an object where keys are subject and values are array of topics
  //totaldays is how many days you want to distribute the topics over
  const subjectTopiclist = [];
  //subjectTopiclist will contain {subject,topic} pairs
  //for fair distribution of topics across days

  for (const subject in topicsmap) {
    topicsmap[subject].forEach((topic) => {
      subjectTopiclist.push({ subject, topic });
    });
  }
  //this loop is to create the subjectTopiclist array

  const schedule = Array.from({ length: totalDays }, () => []);
  //schedule is an array of arrays, where each inner array represents a day

  for (let i = 0; i < subjectTopiclist.length; i++) {
    schedule[i % totalDays].pish(flatlist[i]);
  }
  return schedule;
  //loop for distributing the topics accross the days in round robin fashion
}

module.exports = distributeTopics;
