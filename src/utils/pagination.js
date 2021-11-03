const pageCount = (dataCount, dataPerPage) =>
  Math.ceil(dataCount / dataPerPage);

const navigation = (page, numberOfPages, threshold) => {
  let fromPage = page === 1 ? 1 : page - 1;
  let untilPage = fromPage + threshold;

  if (untilPage > numberOfPages) {
    untilPage = numberOfPages;
    const adjust = untilPage - threshold;
    fromPage = adjust <= 0 ? 1 : adjust;
  }

  return { fromPage, untilPage };
};

const showingFrom = (dataPerPage, currentPage) =>
  dataPerPage * (currentPage - 1) + 1;

const showingUntil = (dataPerPage, currentPage, dataCount) =>
  dataPerPage * currentPage > dataCount ? dataCount : dataPerPage * currentPage;

const pagination = (dataCount, dataPerPage, currentPage, threshold) => {
  const numberOfPages = pageCount(dataCount, dataPerPage);
  const boundaries = navigation(currentPage, numberOfPages, threshold);

  const from = showingFrom(dataPerPage, currentPage);
  const until = showingUntil(dataPerPage, currentPage, dataCount);

  return {
    numberOfPages,
    navigation: boundaries,
    dataCount,
    page: {
      previous: currentPage - 1 === 0 ? -1 : currentPage - 1,
      current: currentPage,
      next: currentPage + 1 > numberOfPages ? -1 : currentPage + 1,
    },
    showingFrom: from,
    showingUntil: until,
  };
};

module.exports = { pagination };
