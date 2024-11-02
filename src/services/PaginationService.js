export const PageService = {
  getPageObject(pagesView) {
    const pageObj = {
      currentPage: 1,
      totalPages: 1,
    };

    const urlPageLast = pagesView["hydra:last"];
    const urlPageCurrent = pagesView["@id"];

    // Extraction de la page actuelle depuis l'URL
    if (urlPageCurrent) {
      pageObj.currentPage = parseInt(urlPageCurrent.replace("/api/animals?page=", ""), 10);
    }

    // Extraction du total de pages depuis l'URL de la dernière page
    if (urlPageLast) {
      pageObj.totalPages = parseInt(urlPageLast.replace("/api/animals?page=", ""), 10);
    }

    return pageObj;
  },
};
