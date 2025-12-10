// Mock Authentication Service - Sử dụng localStorage khi server không kết nối được

const MOCK_USERS_KEY = 'mock_users';
const MOCK_CURRENT_USER_KEY = 'mock_current_user';

// Lấy danh sách users từ localStorage
const getMockUsers = () => {
  try {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting mock users:', error);
    return [];
  }
};

// Lưu danh sách users vào localStorage
const saveMockUsers = (users) => {
  try {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving mock users:', error);
  }
};

// Kiểm tra email đã tồn tại chưa
export const mockCheckEmailExists = (email) => {
  const users = getMockUsers();
  const user = users.find(u => u.email === email);
  return user || null;
};

// Đăng ký tài khoản mới (mock)
export const mockRegister = (userData) => {
  const { fullname, email, tel, address, password, avatar } = userData;
  
  // Kiểm tra email đã tồn tại
  if (mockCheckEmailExists(email)) {
    throw new Error('Email đã tồn tại trên hệ thống');
  }
  
  // Tạo user mới
  const newUser = {
    id: Date.now(), // ID tạm thời
    fullname: fullname || '',
    email: email,
    phone: tel || '',
    address: address || '',
    avatar: avatar || '',
    role: 'customer',
    is_active: 1,
    created_at: new Date().toISOString()
  };
  
  // Lưu password (không hash trong mock, chỉ để test)
  const users = getMockUsers();
  users.push({
    ...newUser,
    password: password // Lưu password plain text (chỉ cho mock)
  });
  
  saveMockUsers(users);
  
  // Trả về user không có password
  const { password: _, ...userWithoutPassword } = newUser;
  
  return {
    message: 'Đăng ký tài khoản thành công! (Mock Mode)',
    user: userWithoutPassword
  };
};

// Đăng nhập (mock)
export const mockLogin = (email, password) => {
  const users = getMockUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Tài khoản không tồn tại, vui lòng kiểm tra lại');
  }
  
  if (user.password !== password) {
    throw new Error('Tài khoản/mật khẩu không chính xác, vui lòng thử lại!');
  }
  
  // Tạo token giả
  const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Trả về user không có password
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    message: 'Đăng nhập thành công! (Mock Mode)',
    user: userWithoutPassword,
    accessToken: mockToken
  };
};

// Kiểm tra xem có đang dùng mock mode không
export const isMockMode = () => {
  return localStorage.getItem('use_mock_auth') === 'true';
};

// Bật/tắt mock mode
export const setMockMode = (enabled) => {
  if (enabled) {
    localStorage.setItem('use_mock_auth', 'true');
  } else {
    localStorage.removeItem('use_mock_auth');
  }
};

// Kiểm tra xem token có phải là mock token không
export const isMockToken = (token) => {
  return token && token.startsWith('mock_token_');
};

// Lấy user ID từ mock token (lưu trong user object thay vì decode)
export const getUserIdFromMockToken = () => {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.id || null;
    }
  } catch (error) {
    console.error('Error getting user ID from mock token:', error);
  }
  return null;
};

// Mock Products Data - Sử dụng khi server không kết nối được
export const getMockProducts = () => {
  return [
    {
      id: 1,
      sku: 'EPSONL3250',
      product_code: 'EPSONL3250',
      name: 'Máy in Epson EcoTank L3250',
      description: 'Máy in phun màu đa năng WiFi.',
      brand: 'Epson',
      image: '/assets/EPSONL3250.jpg',
      price: 400000,
      monthly_price: 400000,
      deposit_required: 600000,
      sale_price: 0,
      stock: 12,
      status: 1,
      categories_id: 1,
      category_names: 'Máy in',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      sku: 'BROHL1210W',
      product_code: 'BROHL1210W',
      name: 'Máy in Brother HL-L1210W',
      description: 'In laser đen trắng, kết nối không dây.',
      brand: 'Brother',
      image: '/assets/BROHL1210W.jpg',
      price: 320000,
      monthly_price: 320000,
      deposit_required: 400000,
      sale_price: 0,
      stock: 15,
      status: 1,
      categories_id: 1,
      category_names: 'Máy in',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 3,
      sku: 'INKC13T00V',
      product_code: 'INKC13T00V',
      name: 'Mực in Epson 003 Đen',
      description: 'Mực in chính hãng cho dòng EcoTank.',
      brand: 'Epson',
      image: '/assets/INKC13T00V.jpg',
      price: 50000,
      monthly_price: 50000,
      deposit_required: 50000,
      sale_price: 0,
      stock: 50,
      status: 1,
      categories_id: 3,
      category_names: 'Mực in',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 4,
      sku: 'TONER12A',
      product_code: 'TONER12A',
      name: 'Mực in HP 12A (Q2612A)',
      description: 'Hộp mực laser dành cho máy in HP LaserJet.',
      brand: 'HP',
      image: '/assets/TONER12A.jpg',
      price: 80000,
      monthly_price: 80000,
      deposit_required: 80000,
      sale_price: 0,
      stock: 40,
      status: 1,
      categories_id: 3,
      category_names: 'Mực in',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 5,
      sku: 'HUYPAPER63C',
      product_code: 'HUYPAPER63C',
      name: 'Máy hủy giấy Silicon PS-632C',
      description: 'Máy hủy giấy mini cho văn phòng.',
      brand: 'Silicon',
      image: '/assets/HUYPAPER63C.jpg',
      price: 250000,
      monthly_price: 250000,
      deposit_required: 300000,
      sale_price: 0,
      stock: 8,
      status: 1,
      categories_id: 4,
      category_names: 'Máy hủy giấy',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 6,
      sku: 'HUYRC2210',
      product_code: 'HUYRC2210',
      name: 'Máy hủy giấy Roco RC-2210',
      description: 'Hủy vụn siêu nhỏ bảo mật cao.',
      brand: 'Roco',
      image: '/assets/HUYRC2210.jpg',
      price: 300000,
      monthly_price: 300000,
      deposit_required: 350000,
      sale_price: 0,
      stock: 6,
      status: 1,
      categories_id: 4,
      category_names: 'Máy hủy giấy',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 7,
      sku: 'PCVNGAMING01',
      product_code: 'PCVNGAMING01',
      name: 'Máy tính bàn Gaming VN G1',
      description: 'CPU i5, RAM 16GB, SSD 512GB, GTX 1660.',
      brand: 'VNTech',
      image: '/assets/PCVNGAMING01.jpg',
      price: 1500000,
      monthly_price: 1500000,
      deposit_required: 5000000,
      sale_price: 0,
      stock: 5,
      status: 1,
      categories_id: 5,
      category_names: 'Máy tính bàn',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 8,
      sku: 'PCHPVN01',
      product_code: 'PCHPVN01',
      name: 'Máy tính bàn HP ProDesk 400 G6',
      description: 'PC văn phòng bền bỉ, tiết kiệm điện.',
      brand: 'HP',
      image: '/assets/PCHPVN01.jpg',
      price: 1200000,
      monthly_price: 1200000,
      deposit_required: 4500000,
      sale_price: 0,
      stock: 7,
      status: 1,
      categories_id: 5,
      category_names: 'Máy tính bàn',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 9,
      sku: 'RICMP2014AD',
      product_code: 'RICMP2014AD',
      name: 'Máy photocopy Ricoh MP 2014AD',
      description: 'Copy – Scan – In, tốc độ 20 trang/phút.',
      brand: 'Ricoh',
      image: '/assets/RICMP2014AD.jpg',
      price: 900000,
      monthly_price: 900000,
      deposit_required: 1500000,
      sale_price: 0,
      stock: 4,
      status: 1,
      categories_id: 2,
      category_names: 'Máy photocopy',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 10,
      sku: 'CANIRADV4035',
      product_code: 'CANIRADV4035',
      name: 'Máy photocopy Canon IR-ADV 4035',
      description: 'Máy photocopy đa chức năng khổ A3.',
      brand: 'Canon',
      image: '/assets/CANIRADV4035.jpg',
      price: 1200000,
      monthly_price: 1200000,
      deposit_required: 2000000,
      sale_price: 0,
      stock: 3,
      status: 1,
      categories_id: 2,
      category_names: 'Máy photocopy',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 11,
      sku: 'RAM16GDDR4',
      product_code: 'RAM16GDDR4',
      name: 'Ram 16GB DDR4 Bus 3200',
      description: 'RAM DDR4 hiệu năng cao cho PC.',
      brand: 'Kingston',
      image: '/assets/RAM16GDDR4.jpg',
      price: 80000,
      monthly_price: 80000,
      deposit_required: 100000,
      sale_price: 0,
      stock: 30,
      status: 1,
      categories_id: 6,
      category_names: 'Linh kiện máy tính',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 12,
      sku: 'SSD512GNVME',
      product_code: 'SSD512GNVME',
      name: 'SSD NVMe 512GB PCIe 3.0',
      description: 'Ổ cứng SSD NVMe tốc độ cao.',
      brand: 'Samsung',
      image: '/assets/SSD512GNVME.jpg',
      price: 100000,
      monthly_price: 100000,
      deposit_required: 150000,
      sale_price: 0,
      stock: 25,
      status: 1,
      categories_id: 6,
      category_names: 'Linh kiện máy tính',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    }
  ];
};

// Mock Categories Data - Sử dụng khi server không kết nối được
export const getMockCategories = () => {
  return [
    {
      id: 1,
      name: 'Máy in',
      slug: 'may-in',
      parent_id: null,
      status: 1
    },
    {
      id: 2,
      name: 'Máy photocopy',
      slug: 'may-photocopy',
      parent_id: null,
      status: 1
    },
    {
      id: 3,
      name: 'Mực in',
      slug: 'muc-in',
      parent_id: null,
      status: 1
    },
    {
      id: 4,
      name: 'Máy hủy giấy',
      slug: 'may-huy-giay',
      parent_id: null,
      status: 1
    },
    {
      id: 5,
      name: 'Máy tính bàn',
      slug: 'may-tinh-ban',
      parent_id: null,
      status: 1
    },
    {
      id: 6,
      name: 'Linh kiện máy tính',
      slug: 'linh-kien-may-tinh',
      parent_id: null,
      status: 1
    }
  ];
};

