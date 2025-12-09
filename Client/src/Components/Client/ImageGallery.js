import mayin01 from "../../Assets/Client/Images/mayin_01.jpg";
import mayin02 from "../../Assets/Client/Images/mayin_02.jpg";
import mayin03 from "../../Assets/Client/Images/mayin_03.jpg";
import mayin04 from "../../Assets/Client/Images/mayin_04.jpg";
import mayscan01 from "../../Assets/Client/Images/mayscan_01.jpg";
import mayphoto01 from "../../Assets/Client/Images/mayphoto_01.jpg";
import mayphotocopy03 from "../../Assets/Client/Images/mayphotocopy_03.png";
import mayphotocopy04 from "../../Assets/Client/Images/mayphotocopy_04.png";
import mayhuygiay04 from "../../Assets/Client/Images/mayhuygiay_04.jpg";
import maytinh03 from "../../Assets/Client/Images/maytinh_03.jpg";
import ssd01 from "../../Assets/Client/Images/SSD_01.jpg";
import ssd from "../../Assets/Client/Images/SSD.jpg";

const ImageGallery = {
    mayin01,
    mayin02,
    mayin03,
    mayin04,
    mayscan01,
    mayphoto01,
    mayphotocopy03,
    mayphotocopy04,
    mayhuygiay04,
    maytinh03,
    ssd01,
    ssd,
};

// Hàm tạo hash từ chuỗi để phân phối ảnh đều
const hashString = (str) => {
  let hash = 0;
  if (!str) return 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Hàm gán ảnh phù hợp cho sản phẩm dựa trên tên và category
export const getProductImage = (product, categories = []) => {
  // Kiểm tra product hợp lệ
  if (!product) {
    return ImageGallery.mayin01; // Ảnh mặc định
  }

  // Nếu sản phẩm đã có ảnh từ database, ưu tiên dùng ảnh đó
  if (product.image) {
    // Kiểm tra nếu là URL đầy đủ (http/https)
    if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
      return product.image;
    }
    // Kiểm tra nếu là đường dẫn tuyệt đối (bắt đầu bằng /)
    if (product.image.startsWith('/')) {
      return product.image;
    }
    // Kiểm tra nếu là đường dẫn tương đối từ public folder
    if (product.image && product.image.trim() !== '') {
      // Nếu không bắt đầu bằng /, thêm / để trở thành đường dẫn tuyệt đối
      return product.image.startsWith('./') ? product.image.substring(2) : `/${product.image}`;
    }
  }

  if (!product.name) {
    return ImageGallery.mayin01; // Ảnh mặc định
  }

  const productName = (product.name || '').toLowerCase();
  // Đảm bảo categories là array và tìm category
  const categoryArray = Array.isArray(categories) ? categories : [];
  const categoryName = categoryArray.find(cat => cat && cat.id === product.categories_id)?.name?.toLowerCase() || '';
  const categorySlug = categoryArray.find(cat => cat && cat.id === product.categories_id)?.slug || '';
  
  // Tạo hash từ tên sản phẩm và ID để phân phối ảnh tốt hơn
  const imageHash = hashString(productName + (product.id || 0));

  // Máy hủy giấy - kiểm tra trước để tránh nhầm lẫn với các từ khóa khác
  if (productName.includes('hủy giấy') || productName.includes('huy giay') ||
      productName.includes('shredder') || productName.includes('destroy') ||
      categorySlug === 'may-huy-giay' ||
      categoryName.includes('hủy giấy') || categoryName.includes('huy giay')) {
    return ImageGallery.mayhuygiay04;
  }

  // Mực in - kiểm tra trước máy in để tránh nhầm lẫn
  if (productName.includes('mực') || productName.includes('muc') ||
      productName.includes('ink') || productName.includes('toner') ||
      productName.includes('cartridge') || productName.includes('hộp mực') ||
      productName.includes('hop muc') || categorySlug === 'muc-in' || 
      categoryName.includes('mực') || categoryName.includes('muc')) {
    // Dùng ảnh mực in riêng - phân phối để tránh trùng
    const images = [ImageGallery.mayin03, ImageGallery.mayin04];
    return images[imageHash % images.length] || ImageGallery.mayin03;
  }

  // Máy photocopy - kiểm tra trước máy in
  if (productName.includes('photocopy') || productName.includes('photo copy') ||
      productName.includes('multifunction') || productName.includes('mfp') ||
      categorySlug === 'may-photocopy' || categoryName.includes('photocopy')) {
    const images = [ImageGallery.mayphoto01, ImageGallery.mayphotocopy03, ImageGallery.mayphotocopy04];
    return images[imageHash % images.length] || ImageGallery.mayphoto01;
  }

  // Máy scan
  if (productName.includes('scan') || productName.includes('scanner') ||
      categorySlug === 'may-scan' || categoryName.includes('scan')) {
    return ImageGallery.mayscan01;
  }

  // Linh kiện máy tính - dùng ảnh SSD (kiểm tra trước máy tính bàn)
  if (productName.includes('ram') || productName.includes('ssd') ||
      productName.includes('hdd') || productName.includes('nvme') ||
      productName.includes('card') || productName.includes('vga') ||
      productName.includes('linh kiện') || productName.includes('linh kien') ||
      categorySlug === 'linh-kien-may-tinh' ||
      categoryName.includes('linh kiện') || categoryName.includes('linh kien')) {
    // Dùng ảnh SSD cho linh kiện - phân phối dựa trên hash
    const images = [ImageGallery.ssd01, ImageGallery.ssd];
    return images[imageHash % images.length] || ImageGallery.ssd01;
  }

  // Máy tính bàn - dùng ảnh maytinh
  if (productName.includes('máy tính') || productName.includes('may tinh') ||
      productName.includes('desktop') || 
      (productName.includes('pc') && !productName.includes('ram') && !productName.includes('ssd')) ||
      productName.includes('computer') || productName.includes('gaming') ||
      categorySlug === 'may-tinh-ban' ||
      categoryName.includes('máy tính') || categoryName.includes('may tinh')) {
    return ImageGallery.maytinh03;
  }

  // Máy in - kiểm tra sau các loại khác
  if (productName.includes('máy in') || productName.includes('may in') || 
      productName.includes('printer') || productName.includes('inkjet') || 
      productName.includes('laser') || categorySlug === 'may-in' ||
      categoryName.includes('máy in') || categoryName.includes('may in')) {
    // Dùng ảnh máy in: mayin_01, 02, 03, 04 - phân phối dựa trên hash của tên
    const images = [ImageGallery.mayin01, ImageGallery.mayin02, ImageGallery.mayin03, ImageGallery.mayin04];
    return images[imageHash % images.length] || ImageGallery.mayin01;
  }

  // Mặc định: dùng ảnh máy in (KHÔNG dùng menu images - đồ ăn)
  return ImageGallery.mayin01;
};

export default ImageGallery;

