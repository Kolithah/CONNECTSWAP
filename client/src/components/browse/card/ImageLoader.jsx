import img1 from "../../../assets/img/categories/1.svg"
import img2 from "../../../assets/img/categories/2.svg";
import img3 from "../../../assets/img/categories/3.svg";
import img4 from "../../../assets/img/categories/4.svg";
import img5 from "../../../assets/img/categories/5.svg";
import img6 from "../../../assets/img/categories/6.svg";
import img7 from "../../../assets/img/categories/7.svg";
import img8 from "../../../assets/img/categories/8.svg";
import img9 from "../../../assets/img/categories/9.svg";
import img10 from "../../../assets/img/categories/10.svg";
import img11 from "../../../assets/img/categories/11.svg";
import img12 from "../../../assets/img/categories/12.svg";
import img13 from "../../../assets/img/categories/13.svg";

export const ImageLoader = (key) => {
    var image = img1;

    switch (key) {
        case 1:{ image= img1} break;
        case 2:{ image= img2} break;
        case 3:{ image= img3} break;
        case 4:{ image= img4} break;
        case 5:{ image= img5} break;
        case 6:{ image= img6} break;
        case 7:{ image= img7} break;
        case 8:{ image= img8} break;
        case 9:{ image= img9} break;
        case 10:{ image= img10} break;
        case 11:{ image= img11} break;
        case 12:{ image= img12} break;
        case 13:{ image= img13} break;

        default:
            break;
    }
  return image;
}

