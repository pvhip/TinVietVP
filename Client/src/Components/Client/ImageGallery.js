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

// Hàm tạo hash phức tạp hơn từ nhiều thuộc tính sản phẩm
const getProductHash = (product) => {
  if (!product) return 0;
  
  // Kết hợp nhiều thuộc tính để tạo hash duy nhất hơn
  // Thêm tất cả các thuộc tính có thể để đảm bảo tính duy nhất
  const hashString = `${product.id || 0}_${product.sku || ''}_${product.name || ''}_${product.brand || ''}_${product.categories_id || 0}_${product.price || 0}_${product.monthly_price || 0}_${product.stock || 0}`;
  
  // Sử dụng nhiều vòng lặp và phép toán để tạo hash phức tạp hơn
  let hash = 0;
  for (let i = 0; i < hashString.length; i++) {
    const char = hashString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Thêm ID vào hash một lần nữa để đảm bảo tính duy nhất
  const productId = product.id || 0;
  hash = hash + (productId * 31);
  
  // Sử dụng thuật toán hash tốt hơn (MurmurHash-inspired)
  hash = hash ^ (hash >>> 16);
  hash = hash * 0x85ebca6b;
  hash = hash ^ (hash >>> 13);
  hash = hash * 0xc2b2ae35;
  hash = hash ^ (hash >>> 16);
  
  // Thêm một bước nữa để phân phối tốt hơn
  hash = hash + (hash << 15);
  hash = hash ^ (hash >>> 10);
  hash = hash + (hash << 3);
  hash = hash ^ (hash >>> 6);
  hash = hash + (hash << 11);
  hash = hash ^ (hash >>> 16);
  
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
  
  // Tạo hash phức tạp từ nhiều thuộc tính sản phẩm để phân phối ảnh tốt hơn và tránh trùng
  // Đảm bảo ID là yếu tố chính để mỗi sản phẩm có ảnh khác nhau
  const imageHash = getProductHash(product);
  
  // Sử dụng ID làm yếu tố chính để đảm bảo mỗi sản phẩm có ảnh khác nhau
  // Kết hợp hash với ID để tạo seed duy nhất cho mỗi sản phẩm
  const productId = product.id || 0;
  
  // Tạo seed dựa trên ID để đảm bảo mỗi sản phẩm có ảnh khác nhau
  // Sử dụng ID trực tiếp kết hợp với hash để phân phối đều
  const uniqueSeed = ((imageHash || 0) + productId * 31 + (productId % 100) * 7) % 1000000;
  
  // Đảm bảo safeSeed luôn là số hợp lệ và dựa trên ID
  const safeSeed = isNaN(uniqueSeed) || uniqueSeed < 0 ? Math.abs(productId || 0) : uniqueSeed;
  
  // Đảm bảo seed luôn dương và hợp lệ
  const finalSeed = Math.abs(safeSeed || productId || 0);

  // Máy hủy giấy - kiểm tra trước để tránh nhầm lẫn với các từ khóa khác
  if (productName.includes('hủy giấy') || productName.includes('huy giay') ||
      productName.includes('shredder') || productName.includes('destroy') ||
      categorySlug === 'may-huy-giay' ||
      categoryName.includes('hủy giấy') || categoryName.includes('huy giay')) {
    // Phân phối ảnh dựa trên hash để tránh trùng - dùng ảnh hủy giấy và các ảnh máy in khác
    const images = [
      ImageGallery.mayhuygiay04, 
      ImageGallery.mayin01, 
      ImageGallery.mayin02, 
      ImageGallery.mayin03, 
      ImageGallery.mayin04
    ];
    const selectedIndex = finalSeed % images.length;
    return images[selectedIndex] || ImageGallery.mayhuygiay04;
  }

  // Mực in - kiểm tra trước máy in để tránh nhầm lẫn
  if (productName.includes('mực') || productName.includes('muc') ||
      productName.includes('ink') || productName.includes('toner') ||
      productName.includes('cartridge') || productName.includes('hộp mực') ||
      productName.includes('hop muc') || categorySlug === 'muc-in' || 
      categoryName.includes('mực') || categoryName.includes('muc')) {
    // Dùng nhiều ảnh để phân phối tốt hơn và tránh trùng
    const images = [
      ImageGallery.mayin01, 
      ImageGallery.mayin02, 
      ImageGallery.mayin03, 
      ImageGallery.mayin04,
      ImageGallery.mayphoto01
    ];
    const selectedIndex = safeSeed % images.length;
    return images[selectedIndex] || ImageGallery.mayin03;
  }

  // Máy photocopy - kiểm tra trước máy in
  if (productName.includes('photocopy') || productName.includes('photo copy') ||
      productName.includes('multifunction') || productName.includes('mfp') ||
      categorySlug === 'may-photocopy' || categoryName.includes('photocopy')) {
    const images = [ImageGallery.mayphoto01, ImageGallery.mayphotocopy03, ImageGallery.mayphotocopy04];
    const selectedIndex = safeSeed % images.length;
    return images[selectedIndex] || ImageGallery.mayphoto01;
  }

  // Máy scan
  if (productName.includes('scan') || productName.includes('scanner') ||
      categorySlug === 'may-scan' || categoryName.includes('scan')) {
    // Phân phối ảnh dựa trên hash để tránh trùng
    const images = [
      ImageGallery.mayscan01, 
      ImageGallery.mayin01, 
      ImageGallery.mayin02, 
      ImageGallery.mayin03, 
      ImageGallery.mayin04
    ];
    const selectedIndex = safeSeed % images.length;
    return images[selectedIndex] || ImageGallery.mayscan01;
  }

  // Linh kiện máy tính - dùng ảnh SSD (kiểm tra trước máy tính bàn)
  if (productName.includes('ram') || productName.includes('ssd') ||
      productName.includes('hdd') || productName.includes('nvme') ||
      productName.includes('card') || productName.includes('vga') ||
      productName.includes('linh kiện') || productName.includes('linh kien') ||
      categorySlug === 'linh-kien-may-tinh' ||
      categoryName.includes('linh kiện') || categoryName.includes('linh kien')) {
    // Dùng nhiều ảnh để phân phối tốt hơn và tránh trùng
    const images = [
      ImageGallery.ssd01, 
      ImageGallery.ssd,
      ImageGallery.mayin01,
      ImageGallery.mayin02,
      ImageGallery.mayin03,
      ImageGallery.maytinh03
    ];
    const selectedIndex = safeSeed % images.length;
    return images[selectedIndex] || ImageGallery.ssd01;
  }

  // Máy tính bàn - dùng ảnh maytinh
  if (productName.includes('máy tính') || productName.includes('may tinh') ||
      productName.includes('desktop') || 
      (productName.includes('pc') && !productName.includes('ram') && !productName.includes('ssd')) ||
      productName.includes('computer') || productName.includes('gaming') ||
      categorySlug === 'may-tinh-ban' ||
      categoryName.includes('máy tính') || categoryName.includes('may tinh')) {
    // Phân phối ảnh dựa trên hash để tránh trùng
    const images = [
      ImageGallery.maytinh03, 
      ImageGallery.mayin01, 
      ImageGallery.mayin02, 
      ImageGallery.mayin03, 
      ImageGallery.mayin04
    ];
    const selectedIndex = safeSeed % images.length;
    return images[selectedIndex] || ImageGallery.maytinh03;
  }

  // Máy in - kiểm tra sau các loại khác
  if (productName.includes('máy in') || productName.includes('may in') || 
      productName.includes('printer') || productName.includes('inkjet') || 
      productName.includes('laser') || categorySlug === 'may-in' ||
      categoryName.includes('máy in') || categoryName.includes('may in')) {
    // Dùng ảnh máy in: mayin_01, 02, 03, 04 - phân phối dựa trên hash của tên
    const images = [ImageGallery.mayin01, ImageGallery.mayin02, ImageGallery.mayin03, ImageGallery.mayin04];
    const selectedIndex = safeSeed % images.length;
    return images[selectedIndex] || ImageGallery.mayin01;
  }

  // Mặc định: phân phối ảnh máy in dựa trên hash để tránh trùng
  const defaultImages = [
    ImageGallery.mayin01, 
    ImageGallery.mayin02, 
    ImageGallery.mayin03, 
    ImageGallery.mayin04,
    ImageGallery.mayphoto01,
    ImageGallery.mayphotocopy03,
    ImageGallery.mayphotocopy04
  ];
  const selectedIndex = safeSeed % defaultImages.length;
  return defaultImages[selectedIndex] || ImageGallery.mayin01;
};

export default ImageGallery;

