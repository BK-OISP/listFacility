const convertMoney = (value) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default convertMoney;
