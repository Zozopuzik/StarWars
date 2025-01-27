import axios from 'axios';

const api = {
  getData: async link => {
    try {
      const response = await axios.get(link);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default api;
