const strManipulations = {
  getPageNumber: str => {
    const match = str.match(/[?&]page=(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  },
  countByField: (array, field, value) => {
    return array.filter(item => item[field] === value).length;
  },
};

export default strManipulations;
