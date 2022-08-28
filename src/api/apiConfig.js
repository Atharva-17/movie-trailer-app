const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'fe4cb357fd8ec7a03a5df380511fc7c3',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;