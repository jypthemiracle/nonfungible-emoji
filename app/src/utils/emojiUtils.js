import { Logo } from '../images';

const getImgSrc = (imgId, path) => {
    if (imgId == null || undefined) {
        return Logo;
    }
    return `../images/emoji/${path}/${imgId}.svg` // template literals
}

export default getImgSrc;
