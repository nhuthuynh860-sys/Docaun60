import { MockPost, MockComment } from '../types/bloggerTheme';

export const INITIAL_MOCK_POSTS: MockPost[] = [
  {
    id: 'post-1',
    title: 'Kinh nghiệm chọn phao và cân chỉnh mồi câu cá chép hồ dịch vụ',
    url: '#post-1',
    snippet:
      'Tổng hợp phương pháp cân phao chì rơi, cách đọc tín hiệu phao nhịp đè và kỹ thuật phối mồi tự nhiên giúp tăng tỷ lệ bắt cá chép củ hiệu quả.',
    featuredImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    date: '02 Tháng 10, 2026',
    isoDate: '2026-10-02T10:00:00Z',
    readTime: '6 phút đọc',
    author: {
      name: 'Đồ Câu N60',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Chuyên gia Câu Đài',
    },
    labels: ['Kỹ thuật', 'Cá chép', 'Bài mồi'],
    commentCount: 14,
    featured: true,
    bodyHtml: `
      <p>Câu cá chép ở hồ dịch vụ đòi hỏi cần thủ phải có sự nhạy bén trong việc bắt nhịp phao và điều chỉnh trạng thái mồi câu. Cá chép hồ thường rất khôn, nhát mồi và thăm dò kỹ lưỡng trước khi hút mồi.</p>

      <h2>1. Nguyên lý cân phao đài câu chép</h2>
      <p>Cách cân phao cơ bản và hiệu quả nhất là <strong>cân 4 câu 2</strong> hoặc <strong>cân 7 câu 3</strong> tùy theo độ nhát của cá và sức gió trên mặt hồ. Khi mồi tan dần, phao sẽ từ từ nhô lên báo hiệu trạng thái mồi đáy.</p>

      <blockquote>
        "Cần thủ giỏi không phải là người giật cần nhiều nhất, mà là người biết quan sát đáy hồ qua từng nhịp nhấp nháy của tăm phao."
      </blockquote>

      <h3>2. Kỹ thuật phối mồi hạt & cám tanh thơm</h3>
      <p>Thời tiết mát mẻ vào buổi sáng sớm hoặc chiều muộn thích hợp với mồi có vị thơm dịu, bùi ngậy từ khoai lang, bột đậu xanh kết hợp cùng cám cám tanh nhẹ 20% đạm.</p>

      <pre><code>// Công thức mồi câu chép củ hồ dịch vụ
const baiMoiChep = {
  camTanh: "40%",
  botKhoaiLang: "30%",
  camThomN60: "20%",
  huongLieuTuNhien: "10% (trứng sữa/hoa quả)"
};</code></pre>

      <h2>3. Đọc tín hiệu phao nhịp đè và nhịp trồi</h2>
      <p>Khi cá chép hút mồi, phao thường có nhịp chìm từ từ 1 đến 2 nấc hoặc trồi nhẹ rồi đứng yên. Đó là thời điểm vàng để thực hiện động tác đóng cần dứt khoát.</p>
    `,
  },
  {
    id: 'post-2',
    title: 'Dây Monofilament (dây cước nylon) là gì? Hướng dẫn chọn số trục thẻo',
    url: '#post-2',
    snippet:
      'Tìm hiểu chi tiết về đặc tính của dây cước nylon, độ giãn, tải trọng và kinh nghiệm chọn cỡ dây trục, dây thẻo phù hợp với từng loài cá.',
    featuredImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    date: '28 Tháng 9, 2026',
    isoDate: '2026-09-28T14:30:00Z',
    readTime: '4 phút đọc',
    author: {
      name: 'Đồ Câu N60',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Chuyên gia Câu Đài',
    },
    labels: ['Dây câu cá', 'Kỹ thuật'],
    commentCount: 9,
    bodyHtml: `
      <p>Dây cước nylon (Monofilament) là loại dây câu phổ biến nhất hiện nay nhờ độ co giãn tốt, khả năng giảm sốc khi cá giật mạnh và mức giá phải chăng.</p>
      <h2>Bảng quy đổi số trục và thẻo</h2>
      <p>Khi câu cá rô phi tự nhiên, cấu hình trục 1.5 kết hợp thẻo 0.8 hoặc 1.0 mang lại độ nhạy cao nhất mà vẫn đảm bảo độ an toàn khi đụng cá to.</p>
    `,
  },
  {
    id: 'post-3',
    title: 'Cách làm mồi câu cá rô phi siêu nhạy mùa hè hồ tự nhiên',
    url: '#post-3',
    snippet:
      'Chia sẻ công thức làm mồi tôm đỏ, mồi gan heo và mồi bột ngũ cốc bắt cá rô phi cụ cực bén cho cần thủ dã ngoại.',
    featuredImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    date: '24 Tháng 9, 2026',
    isoDate: '2026-09-24T09:15:00Z',
    readTime: '5 phút đọc',
    author: {
      name: 'Đồ Câu N60',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Chuyên gia Câu Đài',
    },
    labels: ['Cá rô phi', 'Bài mồi'],
    commentCount: 18,
    bodyHtml: `
      <p>Cá rô phi vào mùa hè ăn rất mạnh nhưng cũng rất kén mùi vị nếu nguồn nước bị ô nhiễm hoặc có quá nhiều cá con phá mồi. Phối trộn vị tanh thơm tự nhiên từ tôm tươi sẽ kích thích cá rô phi lớn vào ổ nhanh chóng.</p>
    `,
  },
  {
    id: 'post-4',
    title: 'Kỹ thuật chọn cần câu tay carbon: Độ cứng 4H, 5H hay 6H?',
    url: '#post-4',
    snippet:
      'Phân tích chi tiết độ nảy, trọng lượng và tình huống sử dụng của các dòng cần câu đài từ mềm cảm giác (4H) đến săn hàng (6H-8H).',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    date: '19 Tháng 9, 2026',
    isoDate: '2026-09-19T11:45:00Z',
    readTime: '7 phút đọc',
    author: {
      name: 'Đồ Câu N60',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Chuyên gia Câu Đài',
    },
    labels: ['Kỹ thuật', 'Phụ kiện'],
    commentCount: 11,
    bodyHtml: `
      <p>Cần 4H và 5H phù hợp nhất cho anh em câu cá rô phi, cá diếc và cá chép vừa với dây thẻo nhỏ. Cần 6H trở lên là lựa chọn hàng đầu cho các giải đấu cần bắt cá nhanh hoặc săn trắm đen cỡ lớn.</p>
    `,
  },
  {
    id: 'post-5',
    title: 'Top phụ kiện câu đài không thể thiếu trong thùng đồ nghề',
    url: '#post-5',
    snippet:
      'Danh sách các dụng cụ quan trọng: kéo cắt cước, ghim thẻo, hạt chặn chì, kìm tháo lưỡi và khăn lau tay chuyên dụng.',
    featuredImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    date: '14 Tháng 9, 2026',
    isoDate: '2026-09-14T08:20:00Z',
    readTime: '3 phút đọc',
    author: {
      name: 'Đồ Câu N60',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Chuyên gia Câu Đài',
    },
    labels: ['Phụ kiện'],
    commentCount: 6,
    bodyHtml: `
      <p>Chuẩn bị đầy đủ phụ kiện nhỏ gọn giúp bạn tiết kiệm thời gian bên bờ hồ và xử lý nhanh chóng các sự cố rối dây, đứt thẻo hoặc chỉnh phao.</p>
    `,
  },
];

export const INITIAL_MOCK_COMMENTS: MockComment[] = [
  {
    id: 'c-1',
    authorName: 'Nguyễn Văn Hùng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    date: '2 giờ trước',
    content:
      'Giao diện template này đẹp và mượt mà y hệt bản Plus UI xịn. Tốc độ tải trang cực nhanh, giao diện mobile có thanh bar điều hướng bên dưới rất tiện lợi!',
  },
  {
    id: 'c-2',
    authorName: 'Trần Minh Quang',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    date: 'Hôm qua lúc 16:30',
    content:
      'Đã copy code XML và dán vào Blogger test thành công, chức năng lưu bài viết (Bookmark) và đổi Dark Mode lưu vĩnh viễn không bị chớp sáng.',
  },
];

export const MOCK_POPULAR_POSTS = [
  { id: 'p-1', title: 'Kinh nghiệm chọn phao và cân chỉnh mồi câu cá chép hồ dịch vụ', views: '14.2k lượt xem', date: '02 Th10' },
  { id: 'p-2', title: 'Dây Monofilament (dây cước nylon) là gì? Hướng dẫn chọn số trục thẻo', views: '9.8k lượt xem', date: '28 Th09' },
  { id: 'p-3', title: 'Cách làm mồi câu cá rô phi siêu nhạy mùa hè hồ tự nhiên', views: '7.5k lượt xem', date: '24 Th09' },
  { id: 'p-4', title: 'Kỹ thuật chọn cần câu tay carbon: Độ cứng 4H, 5H hay 6H?', views: '5.1k lượt xem', date: '19 Th09' },
];

export const MOCK_LABELS = [
  { name: 'Kỹ thuật', count: 28 },
  { name: 'Bài mồi', count: 19 },
  { name: 'Cá chép', count: 24 },
  { name: 'Cá rô phi', count: 16 },
  { name: 'Dây câu cá', count: 12 },
  { name: 'Phụ kiện', count: 15 },
];
