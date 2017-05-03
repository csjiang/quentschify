import dict from 'cmu-pronouncing-dictionary';

export default function textTransform(str) {
  var words = str.split(/\W/);
  var result = [];
  for (let i = 0, l = words.length; i < l; i++) {
    var w = words[i];
    if (dict[w]) w = replacePhonemes(w, dict[w]);

    result.push(w);
  }

  return result.join(' ');
};

const replacePhonemes = (word, phonemes) => {
  var result = word;
  var pList = phonemes.split(' ').sort();

  if (pList.find(p => p === 'K')) result = result.replace(/(?:k|c|ch)/gi, 'qu');
  if (pList.find(p => p === 'S')) result = result.replace(/[cs]+/gi, 'sz');
  if (pList.find(p => p === 'T')) result = result.replace(/t+/gi, 'tz');
  if (pList.find(p => p === 'D')) result = result.replace(/d+/gi, 'dz');
  if (pList.find(p => p === 'SH')) result = result.replace(/sh/gi, 'sch');
  if (pList.find(p => p === 'ZH')) result = result.replace(/z/gi, 'zh');
  if (pList.find(p => p === 'EH0')) result = result.replace(/e/gi, 'que');

  return result;
};
