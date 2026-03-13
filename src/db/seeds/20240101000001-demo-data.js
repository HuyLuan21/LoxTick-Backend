'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Tắt FK check để insert thoải mái theo thứ tự bất kỳ
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')

        // ── USERS ──────────────────────────────────────────────────────────
        await queryInterface.bulkInsert('users', [
            { id: 1,  username: 'nguyenvan_a',  display_name: 'Nguyễn Văn An',    email: 'nguyenvana@gmail.com',  password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Xin chào! Tôi là An 👋',                    followers_count: 4, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: null },
            { id: 2,  username: 'tranthi_b',    display_name: 'Trần Thị Bình',    email: 'tranthib@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Sống là để tận hưởng ✨',               followers_count: 2, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: '2026-02-15 10:00:00' },
            { id: 3,  username: 'lehong_c',     display_name: 'Lê Hồng Châu',     email: 'lehongc@gmail.com',     password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Yêu âm nhạc 🎵 Yêu cuộc sống',          followers_count: 3, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: null },
            { id: 4,  username: 'phamthu_d',    display_name: 'Phạm Thu Dung',    email: 'phamthud@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Content creator 🎬 Vietnam 🇻🇳',          followers_count: 3, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: '2025-11-20 09:30:00' },
            { id: 5,  username: 'vuminh_e',     display_name: 'Vũ Minh Đức',      email: 'vumine@gmail.com',      password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Gym & Fitness 💪',                       followers_count: 3, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: null },
            { id: 6,  username: 'danglan_f',    display_name: 'Đặng Lan Phương',  email: 'danglanf@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Foodie 🍜 Traveler ✈️',                 followers_count: 4, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: '2026-01-10 14:00:00' },
            { id: 7,  username: 'buituan_g',    display_name: 'Bùi Tuấn Nghĩa',   email: 'buituang@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Developer by day 🧑‍💻 Gamer by night 🎮', followers_count: 4, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: null },
            { id: 8,  username: 'ngothuy_h',    display_name: 'Ngô Thùy Hương',   email: 'ngothuyh@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Makeup artist 💄 Beauty tips daily',     followers_count: 3, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: '2025-10-05 08:00:00' },
            { id: 9,  username: 'hoangnam_i',   display_name: 'Hoàng Nam Khánh',  email: 'hoganami@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Nhiếp ảnh gia 📸 Thiên nhiên 🌿',         followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: null },
            { id: 10, username: 'lythao_j',     display_name: 'Lý Thảo Vy',       email: 'lythaoj@gmail.com',     password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Dance lover 💃 K-pop fan',              followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: '2026-02-01 20:00:00' },
            { id: 11, username: 'tranminh_k',   display_name: 'Trần Minh Khôi',   email: 'tranminhk@gmail.com',   password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Chef tại gia 👨‍🍳 Chia sẻ công thức mỗi ngày', followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:48', updated_at: '2026-03-10 11:37:48', username_updated_at: null },
            { id: 12, username: 'nguyenlinh_l', display_name: 'Nguyễn Linh Chi',  email: 'nguyenlinhl@gmail.com', password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Yêu mèo 🐱 Yêu chó 🐶',                 followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: '2025-12-01 11:00:00' },
            { id: 13, username: 'phanquoc_m',   display_name: 'Phan Quốc Hùng',   email: 'phanquocm@gmail.com',   password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Vlogger du lịch 🌏',                    followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: null },
            { id: 14, username: 'dothien_n',    display_name: 'Đỗ Thiên Ân',      email: 'dothienn@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Học sinh chăm chỉ 📚',                  followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: null },
            { id: 15, username: 'caohuy_o',     display_name: 'Cao Huy Hoàng',    email: 'caohuyo@gmail.com',     password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Streamer 🎮 Esports',                   followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: '2026-02-20 16:00:00' },
            { id: 16, username: 'maihuong_p',   display_name: 'Mai Hương Giang',  email: 'maihuongp@gmail.com',   password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Singer & Songwriter 🎤',               followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: null },
            { id: 17, username: 'luudat_q',     display_name: 'Lưu Đạt Quân',     email: 'luudatq@gmail.com',     password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Entrepreneur 💼 Startup Vietnam',       followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: '2025-09-15 07:00:00' },
            { id: 18, username: 'trinhnga_r',   display_name: 'Trịnh Ngọc Ánh',   email: 'trinhgar@gmail.com',    password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Yoga & Meditation 🧘‍♀️',               followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: null },
            { id: 19, username: 'diepan_s',     display_name: 'Điệp An Như',      email: 'diepans@gmail.com',     password_hash: '$2a$12$IV0uNj6TJSjTtbMuvH4OLO5aZpMvfT94f3cyL3Yovs0BvLPoPoZf6', avatar_url: null, bio: 'Artist 🎨 Digital creator',            followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 11:37:49', username_updated_at: '2026-01-25 13:00:00' },
            { id: 20, username: 'Trong Huan cut ', display_name: 'Huy Pro 2026',  email: 'tronghuanxxx@gmail.com', password_hash: '$2a$10$hJbuoBZ2m4cvJfr.h.znyOgxNyNKQKBJbyF6nQiguhJ.pdj.XaMvW', avatar_url: 'https://res.cloudinary.com/huy/image/upload/v123/avatar.jpg', bio: 'Đang code TikTok Clone cực căng', followers_count: 1, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 11:37:49', updated_at: '2026-03-10 15:51:42', username_updated_at: null },
            { id: 21, username: 'duominz',      display_name: null,               email: 'duominznguyen@gmail.com', password_hash: '$2a$10$fvBMM78TrFN5awmo.LNYw.1l4fYQCqanoHEC22OOu3GRezd5zAWGy', avatar_url: null, bio: null, followers_count: 0, role: 'user', show_liked_videos: 1, show_saved_videos: 0, created_at: '2026-03-10 17:37:35', updated_at: '2026-03-10 17:37:35', username_updated_at: '2026-03-10 17:37:35' },
        ])

        // ── VIDEOS ─────────────────────────────────────────────────────────
        await queryInterface.bulkInsert('videos', [
            { id: 1,  user_id: 5,  video_url: 'https://storage.example.com/videos/video_001.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_001.jpg', caption: 'Buổi sáng năng động cùng mình nào 💪 #fitness #thethao',     duration: 45,   view_count: 125000, like_count: 18001, comment_count: 2100, save_count: 900,  repost_count: 450,  status: 'active', visibility: 'public', created_at: '2026-03-07 09:00:00' },
            { id: 2,  user_id: 11, video_url: 'https://storage.example.com/videos/video_002.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_002.jpg', caption: 'Công thức nấu phở bò ngon tuyệt vời 🍜 #amthuc #cooking',    duration: 120,  view_count: 98000,  like_count: 14003, comment_count: 1800, save_count: 750,  repost_count: 300,  status: 'active', visibility: 'public', created_at: '2026-03-07 06:00:00' },
            { id: 3,  user_id: 13, video_url: 'https://storage.example.com/videos/video_003.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_003.jpg', caption: 'Chuyến đi Đà Lạt 3 ngày 2 đêm ✈️ #dulich #travel #vlog',     duration: 180,  view_count: 210000, like_count: 31004, comment_count: 3501, save_count: 1403, repost_count: 621,  status: 'active', visibility: 'public', created_at: '2026-03-07 02:00:00' },
            { id: 4,  user_id: 10, video_url: 'https://storage.example.com/videos/video_004.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_004.jpg', caption: 'Dance cover BLACKPINK mới nhất 💃 #dancechallenge #amunhac',  duration: 60,   view_count: 450000, like_count: 72003, comment_count: 8901, save_count: 3202, repost_count: 1801, status: 'active', visibility: 'public', created_at: '2026-03-07 10:00:00' },
            { id: 5,  user_id: 12, video_url: 'https://storage.example.com/videos/video_005.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_005.jpg', caption: 'Mèo nhà mình dễ thương quá 😍 #meodezhuong #cuteanimals',     duration: 30,   view_count: 380000, like_count: 65002, comment_count: 7202, save_count: 2800, repost_count: 1501, status: 'active', visibility: 'public', created_at: '2026-03-07 11:00:00' },
            { id: 6,  user_id: 8,  video_url: 'https://storage.example.com/videos/video_006.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_006.jpg', caption: 'Review makeup look cho mùa hè 💄 #makeup #xuhuong',           duration: 90,   view_count: 175000, like_count: 28002, comment_count: 3101, save_count: 1201, repost_count: 580,  status: 'active', visibility: 'public', created_at: '2026-03-07 07:00:00' },
            { id: 7,  user_id: 7,  video_url: 'https://storage.example.com/videos/video_007.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_007.jpg', caption: 'Lập trình web từ đầu - Bài 1 👨‍💻 #coding #xuhuong',          duration: 600,  view_count: 88000,  like_count: 9502,  comment_count: 1203, save_count: 421,  repost_count: 180,  status: 'active', visibility: 'public', created_at: '2026-03-07 00:00:00' },
            { id: 8,  user_id: 6,  video_url: 'https://storage.example.com/videos/video_008.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_008.jpg', caption: 'Ăn thử 10 món đường phố Hà Nội 🥢 #amthuc #vlog',            duration: 240,  view_count: 320000, like_count: 48003, comment_count: 5603, save_count: 2102, repost_count: 951,  status: 'active', visibility: 'public', created_at: '2026-03-07 04:00:00' },
            { id: 9,  user_id: 9,  video_url: 'https://storage.example.com/videos/video_009.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_009.jpg', caption: 'Chụp ảnh thiên nhiên ở Sapa 📸 #dulich #travel',              duration: 75,   view_count: 142000, like_count: 21001, comment_count: 2400, save_count: 981,  repost_count: 420,  status: 'active', visibility: 'public', created_at: '2026-03-06 21:00:00' },
            { id: 10, user_id: 5,  video_url: 'https://storage.example.com/videos/video_010.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_010.jpg', caption: 'Hướng dẫn tập gym cho người mới 💪 #fitness #thethao',       duration: 480,  view_count: 195000, like_count: 29001, comment_count: 3300, save_count: 1350, repost_count: 600,  status: 'active', visibility: 'public', created_at: '2026-03-06 16:00:00' },
            { id: 11, user_id: 16, video_url: 'https://storage.example.com/videos/video_011.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_011.jpg', caption: 'Cover bài hát trending tuần này 🎤 #amunhac #xuhuong',       duration: 55,   view_count: 265000, like_count: 42002, comment_count: 4801, save_count: 1901, repost_count: 851,  status: 'active', visibility: 'public', created_at: '2026-03-07 08:00:00' },
            { id: 12, user_id: 13, video_url: 'https://storage.example.com/videos/video_012.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_012.jpg', caption: 'Vlog cuối tuần đi biển Vũng Tàu 🏖️ #dulich #vlog',          duration: 150,  view_count: 118000, like_count: 17501, comment_count: 2000, save_count: 820,  repost_count: 360,  status: 'active', visibility: 'public', created_at: '2026-03-06 18:00:00' },
            { id: 13, user_id: 20, video_url: 'https://storage.example.com/videos/video_013.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_013.jpg', caption: 'Mẹo nấu ăn nhanh cho dân văn phòng 🍳 #amthuc #cooking',    duration: 90,   view_count: 225000, like_count: 34003, comment_count: 3900, save_count: 1581, repost_count: 710,  status: 'active', visibility: 'public', created_at: '2026-03-07 05:00:00' },
            { id: 14, user_id: 5,  video_url: 'https://storage.example.com/videos/video_014.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_014.jpg', caption: 'Thử thách 30 ngày không đường 🚫🍬 #fitness #xuhuong',        duration: 120,  view_count: 158000, like_count: 23501, comment_count: 2700, save_count: 1100, repost_count: 490,  status: 'active', visibility: 'public', created_at: '2026-03-06 12:00:00' },
            { id: 15, user_id: 17, video_url: 'https://storage.example.com/videos/video_015.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_015.jpg', caption: 'Unboxing điện thoại mới nhất 2026 📱 #xuhuong #vlog',         duration: 180,  view_count: 412000, like_count: 68002, comment_count: 7801, save_count: 3102, repost_count: 1651, status: 'active', visibility: 'public', created_at: '2026-03-07 06:00:00' },
            { id: 16, user_id: 12, video_url: 'https://storage.example.com/videos/video_016.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_016.jpg', caption: 'Funny moments với boss nhà mình 😂 #cuteanimals #funny',      duration: 25,   view_count: 520000, like_count: 89003, comment_count: 9802, save_count: 4201, repost_count: 2101, status: 'active', visibility: 'public', created_at: '2026-03-07 10:00:00' },
            { id: 17, user_id: 8,  video_url: 'https://storage.example.com/videos/video_017.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_017.jpg', caption: 'Hướng dẫn makeup tự nhiên đi học 💄 #makeup',                duration: 120,  view_count: 145000, like_count: 22001, comment_count: 2500, save_count: 1021, repost_count: 460,  status: 'active', visibility: 'public', created_at: '2026-03-07 03:00:00' },
            { id: 18, user_id: 13, video_url: 'https://storage.example.com/videos/video_018.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_018.jpg', caption: 'Road trip xuyên Việt ngày 1 🚗 #dulich #travel #vlog',        duration: 300,  view_count: 185000, like_count: 27501, comment_count: 3100, save_count: 1280, repost_count: 570,  status: 'active', visibility: 'public', created_at: '2026-03-06 06:00:00' },
            { id: 19, user_id: 7,  video_url: 'https://storage.example.com/videos/video_019.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_019.jpg', caption: 'Học React JS trong 30 phút ⚛️ #coding',                      duration: 1800, view_count: 72000,  like_count: 7801,  comment_count: 980,  save_count: 350,  repost_count: 145,  status: 'active', visibility: 'public', created_at: '2026-03-06 20:00:00' },
            { id: 20, user_id: 10, video_url: 'https://storage.example.com/videos/video_020.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_020.jpg', caption: 'Nhảy cover BTS - Dynamite 🕺 #dancechallenge #amunhac',       duration: 65,   view_count: 395000, like_count: 63003, comment_count: 7101, save_count: 2852, repost_count: 1421, status: 'active', visibility: 'public', created_at: '2026-03-07 09:00:00' },
            { id: 21, user_id: 11, video_url: 'https://storage.example.com/videos/video_021.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_021.jpg', caption: 'Công thức bánh mì Việt Nam chuẩn vị 🥖 #amthuc #cooking',    duration: 180,  view_count: 168000, like_count: 25001, comment_count: 2850, save_count: 1151, repost_count: 520,  status: 'active', visibility: 'public', created_at: '2026-03-07 01:00:00' },
            { id: 22, user_id: 18, video_url: 'https://storage.example.com/videos/video_022.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_022.jpg', caption: 'Yoga buổi sáng 15 phút 🧘‍♀️ #fitness #thethao',              duration: 900,  view_count: 112000, like_count: 16501, comment_count: 1900, save_count: 780,  repost_count: 340,  status: 'active', visibility: 'public', created_at: '2026-03-06 22:00:00' },
            { id: 23, user_id: 12, video_url: 'https://storage.example.com/videos/video_023.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_023.jpg', caption: 'Khoảnh khắc hài hước của mèo 😹 #meodezhuong #funny',         duration: 20,   view_count: 680000, like_count: 112002, comment_count: 12502, save_count: 5101, repost_count: 2801, status: 'active', visibility: 'public', created_at: '2026-03-07 11:00:00' },
            { id: 24, user_id: 19, video_url: 'https://storage.example.com/videos/video_024.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_024.jpg', caption: 'Vẽ tranh digital từ đầu 🎨 #xuhuong',                        duration: 240,  view_count: 95000,  like_count: 13500, comment_count: 1600, save_count: 650,  repost_count: 280,  status: 'active', visibility: 'public', created_at: '2026-03-06 14:00:00' },
            { id: 25, user_id: 6,  video_url: 'https://storage.example.com/videos/video_025.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_025.jpg', caption: 'Top 5 quán cà phê đẹp ở Sài Gòn ☕ #amthuc #vlog',          duration: 120,  view_count: 245000, like_count: 37002, comment_count: 4200, save_count: 1681, repost_count: 750,  status: 'active', visibility: 'public', created_at: '2026-03-07 04:00:00' },
            { id: 26, user_id: 5,  video_url: 'https://storage.example.com/videos/video_026.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_026.jpg', caption: 'Tập thể dục tại nhà không cần dụng cụ 🏃 #fitness',          duration: 360,  view_count: 178000, like_count: 26502, comment_count: 3000, save_count: 1220, repost_count: 545,  status: 'active', visibility: 'public', created_at: '2026-03-06 18:00:00' },
            { id: 27, user_id: 16, video_url: 'https://storage.example.com/videos/video_027.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_027.jpg', caption: 'Cover Sơn Tùng MTP - Muộn Rồi Mà Sao Còn 🎵 #amunhac',     duration: 50,   view_count: 320000, like_count: 51002, comment_count: 5801, save_count: 2301, repost_count: 1100, status: 'active', visibility: 'public', created_at: '2026-03-07 07:00:00' },
            { id: 28, user_id: 13, video_url: 'https://storage.example.com/videos/video_028.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_028.jpg', caption: 'Du lịch Phú Quốc tự túc chi phí thấp 🏝️ #dulich #travel',   duration: 240,  view_count: 205000, like_count: 30502, comment_count: 3450, save_count: 1401, repost_count: 630,  status: 'active', visibility: 'public', created_at: '2026-03-06 00:00:00' },
            { id: 29, user_id: 7,  video_url: 'https://storage.example.com/videos/video_029.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_029.jpg', caption: 'React Native cho người mới bắt đầu 📱 #coding #xuhuong',    duration: 1200, view_count: 65000,  like_count: 7101,  comment_count: 890,  save_count: 321,  repost_count: 130,  status: 'active', visibility: 'public', created_at: '2026-03-06 16:00:00' },
            { id: 30, user_id: 20, video_url: 'https://storage.example.com/videos/video_030.mp4', thumbnail_url: 'https://storage.example.com/thumbnails/thumb_030.jpg', caption: 'Thử thách ăn cay cấp độ 10 🌶️ #funny #amthuc',               duration: 90,   view_count: 490000, like_count: 82001, comment_count: 9201, save_count: 3801, repost_count: 1951, status: 'active', visibility: 'public', created_at: '2026-03-07 08:00:00' },
        ])

        // ── HASHTAGS ───────────────────────────────────────────────────────
        await queryInterface.bulkInsert('hashtags', [
            { id: 1,  name: 'xuhuong',       video_count: 7,  created_at: '2026-03-10 11:37:49' },
            { id: 2,  name: 'dancechallenge',video_count: 2,  created_at: '2026-03-10 11:37:49' },
            { id: 3,  name: 'amthuc',        video_count: 6,  created_at: '2026-03-10 11:37:49' },
            { id: 4,  name: 'dulich',        video_count: 5,  created_at: '2026-03-10 11:37:49' },
            { id: 5,  name: 'thethao',       video_count: 3,  created_at: '2026-03-10 11:37:49' },
            { id: 6,  name: 'amunhac',       video_count: 4,  created_at: '2026-03-10 11:37:49' },
            { id: 7,  name: 'meodezhuong',   video_count: 2,  created_at: '2026-03-10 11:37:49' },
            { id: 8,  name: 'makeup',        video_count: 2,  created_at: '2026-03-10 11:37:49' },
            { id: 9,  name: 'coding',        video_count: 3,  created_at: '2026-03-10 11:37:49' },
            { id: 10, name: 'vlog',          video_count: 6,  created_at: '2026-03-10 11:37:49' },
            { id: 11, name: 'funny',         video_count: 3,  created_at: '2026-03-10 11:37:49' },
            { id: 12, name: 'cuteanimals',   video_count: 2,  created_at: '2026-03-10 11:37:49' },
            { id: 13, name: 'fitness',       video_count: 5,  created_at: '2026-03-10 11:37:49' },
            { id: 14, name: 'travel',        video_count: 4,  created_at: '2026-03-10 11:37:49' },
            { id: 15, name: 'cooking',       video_count: 3,  created_at: '2026-03-10 11:37:49' },
        ])

        // ── VIDEO HASHTAGS ─────────────────────────────────────────────────
        await queryInterface.bulkInsert('video_hashtags', [
            { video_id: 6,  hashtag_id: 1  }, { video_id: 7,  hashtag_id: 1  }, { video_id: 11, hashtag_id: 1  },
            { video_id: 14, hashtag_id: 1  }, { video_id: 15, hashtag_id: 1  }, { video_id: 24, hashtag_id: 1  },
            { video_id: 29, hashtag_id: 1  }, { video_id: 4,  hashtag_id: 2  }, { video_id: 20, hashtag_id: 2  },
            { video_id: 2,  hashtag_id: 3  }, { video_id: 8,  hashtag_id: 3  }, { video_id: 13, hashtag_id: 3  },
            { video_id: 21, hashtag_id: 3  }, { video_id: 25, hashtag_id: 3  }, { video_id: 30, hashtag_id: 3  },
            { video_id: 3,  hashtag_id: 4  }, { video_id: 9,  hashtag_id: 4  }, { video_id: 12, hashtag_id: 4  },
            { video_id: 18, hashtag_id: 4  }, { video_id: 28, hashtag_id: 4  }, { video_id: 1,  hashtag_id: 5  },
            { video_id: 10, hashtag_id: 5  }, { video_id: 22, hashtag_id: 5  }, { video_id: 4,  hashtag_id: 6  },
            { video_id: 11, hashtag_id: 6  }, { video_id: 20, hashtag_id: 6  }, { video_id: 27, hashtag_id: 6  },
            { video_id: 5,  hashtag_id: 7  }, { video_id: 23, hashtag_id: 7  }, { video_id: 6,  hashtag_id: 8  },
            { video_id: 17, hashtag_id: 8  }, { video_id: 7,  hashtag_id: 9  }, { video_id: 19, hashtag_id: 9  },
            { video_id: 29, hashtag_id: 9  }, { video_id: 3,  hashtag_id: 10 }, { video_id: 8,  hashtag_id: 10 },
            { video_id: 12, hashtag_id: 10 }, { video_id: 15, hashtag_id: 10 }, { video_id: 18, hashtag_id: 10 },
            { video_id: 25, hashtag_id: 10 }, { video_id: 16, hashtag_id: 11 }, { video_id: 23, hashtag_id: 11 },
            { video_id: 30, hashtag_id: 11 }, { video_id: 5,  hashtag_id: 12 }, { video_id: 16, hashtag_id: 12 },
            { video_id: 1,  hashtag_id: 13 }, { video_id: 10, hashtag_id: 13 }, { video_id: 14, hashtag_id: 13 },
            { video_id: 22, hashtag_id: 13 }, { video_id: 26, hashtag_id: 13 }, { video_id: 3,  hashtag_id: 14 },
            { video_id: 9,  hashtag_id: 14 }, { video_id: 18, hashtag_id: 14 }, { video_id: 28, hashtag_id: 14 },
            { video_id: 2,  hashtag_id: 15 }, { video_id: 13, hashtag_id: 15 }, { video_id: 21, hashtag_id: 15 },
        ])

        // ── FOLLOWS ────────────────────────────────────────────────────────
        await queryInterface.bulkInsert('follows', [
            { follower_id: 1,  following_id: 2,  created_at: '2026-03-10 11:37:49' }, { follower_id: 1,  following_id: 3,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 1,  following_id: 4,  created_at: '2026-03-10 11:37:49' }, { follower_id: 1,  following_id: 5,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 1,  following_id: 6,  created_at: '2026-03-10 11:37:49' }, { follower_id: 1,  following_id: 7,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 1,  following_id: 8,  created_at: '2026-03-10 11:37:49' }, { follower_id: 2,  following_id: 1,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 2,  following_id: 3,  created_at: '2026-03-10 11:37:49' }, { follower_id: 2,  following_id: 4,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 2,  following_id: 5,  created_at: '2026-03-10 11:37:49' }, { follower_id: 2,  following_id: 6,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 2,  following_id: 7,  created_at: '2026-03-10 11:37:49' }, { follower_id: 3,  following_id: 1,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 3,  following_id: 6,  created_at: '2026-03-10 11:37:49' }, { follower_id: 4,  following_id: 1,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 4,  following_id: 5,  created_at: '2026-03-10 11:37:49' }, { follower_id: 4,  following_id: 7,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 5,  following_id: 2,  created_at: '2026-03-10 11:37:49' }, { follower_id: 5,  following_id: 6,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 5,  following_id: 8,  created_at: '2026-03-10 11:37:49' }, { follower_id: 6,  following_id: 3,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 6,  following_id: 7,  created_at: '2026-03-10 11:37:49' }, { follower_id: 7,  following_id: 4,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 7,  following_id: 8,  created_at: '2026-03-10 11:37:49' }, { follower_id: 8,  following_id: 9,  created_at: '2026-03-10 11:37:49' },
            { follower_id: 9,  following_id: 10, created_at: '2026-03-10 11:37:49' }, { follower_id: 10, following_id: 11, created_at: '2026-03-10 11:37:49' },
            { follower_id: 11, following_id: 12, created_at: '2026-03-10 11:37:49' }, { follower_id: 12, following_id: 13, created_at: '2026-03-10 11:37:49' },
            { follower_id: 13, following_id: 14, created_at: '2026-03-10 11:37:49' }, { follower_id: 14, following_id: 15, created_at: '2026-03-10 11:37:49' },
            { follower_id: 15, following_id: 16, created_at: '2026-03-10 11:37:49' }, { follower_id: 16, following_id: 17, created_at: '2026-03-10 11:37:49' },
            { follower_id: 17, following_id: 18, created_at: '2026-03-10 11:37:49' }, { follower_id: 18, following_id: 19, created_at: '2026-03-10 11:37:49' },
            { follower_id: 19, following_id: 20, created_at: '2026-03-10 11:37:49' }, { follower_id: 20, following_id: 1,  created_at: '2026-03-10 11:37:49' },
        ])

        // ── FRIENDSHIPS ────────────────────────────────────────────────────
        await queryInterface.bulkInsert('friendships', [
            { user_id: 1, friend_id: 2, user_nickname: null, friend_nickname: null, created_at: '2026-03-10 11:37:49' },
            { user_id: 1, friend_id: 3, user_nickname: null, friend_nickname: null, created_at: '2026-03-10 11:37:49' },
            { user_id: 1, friend_id: 4, user_nickname: null, friend_nickname: null, created_at: '2026-03-10 11:37:49' },
            { user_id: 2, friend_id: 5, user_nickname: null, friend_nickname: null, created_at: '2026-03-10 11:37:49' },
            { user_id: 3, friend_id: 6, user_nickname: null, friend_nickname: null, created_at: '2026-03-10 11:37:49' },
            { user_id: 4, friend_id: 7, user_nickname: null, friend_nickname: null, created_at: '2026-03-10 11:37:49' },
        ])

        // ── CONVERSATIONS ──────────────────────────────────────────────────
        await queryInterface.bulkInsert('conversations', [
            { id: 1, created_at: '2026-03-10 11:37:49' },
            { id: 2, created_at: '2026-03-10 11:37:49' },
            { id: 3, created_at: '2026-03-10 11:37:49' },
            { id: 4, created_at: '2026-03-10 11:37:49' },
            { id: 5, created_at: '2026-03-10 11:37:49' },
        ])

        // ── CONVERSATION MEMBERS ───────────────────────────────────────────
        await queryInterface.bulkInsert('conversation_members', [
            { conversation_id: 1, user_id: 1, joined_at: '2026-03-10 11:37:49' }, { conversation_id: 1, user_id: 2, joined_at: '2026-03-10 11:37:49' },
            { conversation_id: 2, user_id: 1, joined_at: '2026-03-10 11:37:49' }, { conversation_id: 2, user_id: 3, joined_at: '2026-03-10 11:37:49' },
            { conversation_id: 3, user_id: 2, joined_at: '2026-03-10 11:37:49' }, { conversation_id: 3, user_id: 5, joined_at: '2026-03-10 11:37:49' },
            { conversation_id: 4, user_id: 3, joined_at: '2026-03-10 11:37:49' }, { conversation_id: 4, user_id: 6, joined_at: '2026-03-10 11:37:49' },
            { conversation_id: 5, user_id: 4, joined_at: '2026-03-10 11:37:49' }, { conversation_id: 5, user_id: 7, joined_at: '2026-03-10 11:37:49' },
        ])

        // ── MESSAGES ───────────────────────────────────────────────────────
        await queryInterface.bulkInsert('messages', [
            { id: 1,  conversation_id: 1, sender_id: 1, content: 'Ê, video mới của mày đỉnh lắm!',                        message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 2,  conversation_id: 1, sender_id: 2, content: 'Cảm ơn mày! Tao mất cả tuần quay đấy 😅',               message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 3,  conversation_id: 1, sender_id: 1, content: 'Xứng đáng! Lần sau collab với tao không?',               message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 4,  conversation_id: 1, sender_id: 2, content: 'Được chứ! Cuối tuần này mày rảnh không?',                message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 5,  conversation_id: 2, sender_id: 1, content: 'Bạn ơi cho mình hỏi quay video ở Đà Lạt chỗ nào đẹp?', message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 6,  conversation_id: 2, sender_id: 3, content: 'Mình hay quay ở hồ Xuân Hương và đồi chè Cầu Đất đó bạn!', message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 7,  conversation_id: 3, sender_id: 2, content: 'Hey, dạo này khỏe không?',                               message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 8,  conversation_id: 3, sender_id: 5, content: 'Khỏe! Đang bận quay video lắm haha',                     message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 9,  conversation_id: 3, sender_id: 2, content: 'Ráng giữ sức khỏe nha 💪',                               message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 10, conversation_id: 4, sender_id: 3, content: 'Công thức nấu ăn của bạn ngon thật sự!',                 message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 11, conversation_id: 4, sender_id: 6, content: 'Cảm ơn bạn! Tuần sau mình ra công thức bún bò nha',      message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 12, conversation_id: 5, sender_id: 4, content: 'Mày có rảnh cuối tuần không? Tao muốn collab',           message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 13, conversation_id: 5, sender_id: 7, content: 'Có! Mày muốn làm video về chủ đề gì?',                   message_type: 'text', ref_video_id: null, is_read: 0, created_at: '2026-03-10 11:37:49' },
        ])

        // ── COMMENTS ───────────────────────────────────────────────────────
        await queryInterface.bulkInsert('comments', [
            { id: 1,  video_id: 4,  user_id: 2,  parent_id: null, content: 'Video hay quá! Nhảy đẹp lắm 👏',               like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 2,  video_id: 5,  user_id: 1,  parent_id: null, content: 'Mèo nhà bạn dễ thương quá trời 😍',            like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 3,  video_id: 5,  user_id: 3,  parent_id: 2,    content: 'Đúng rồi, mình cũng nghĩ vậy!',                like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 4,  video_id: 8,  user_id: 4,  parent_id: null, content: 'Ăn trông ngon quá, thèm rồi 🤤',               like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 5,  video_id: 8,  user_id: 6,  parent_id: null, content: 'Quán nào ngon nhất vậy bạn?',                  like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 6,  video_id: 8,  user_id: 1,  parent_id: 5,    content: 'Quán số 3 đó bạn, ngon lắm!',                  like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 7,  video_id: 16, user_id: 5,  parent_id: null, content: 'Haha funny quá 😂😂😂',                       like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 8,  video_id: 16, user_id: 7,  parent_id: null, content: 'Boss nhà bạn đáng yêu ghê!',                   like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 9,  video_id: 3,  user_id: 8,  parent_id: null, content: 'Đà Lạt đẹp thật, mình cũng muốn đi',           like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 10, video_id: 23, user_id: 9,  parent_id: null, content: 'Clip này xem mãi không chán 😂',               like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 11, video_id: 23, user_id: 10, parent_id: 10,   content: 'Đồng ý! Mèo hài hước thật sự',                 like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 12, video_id: 15, user_id: 11, parent_id: null, content: 'Unbox hay lắm, mua không bạn?',                like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 13, video_id: 11, user_id: 12, parent_id: null, content: 'Công thức này mình thử rồi, ngon thật!',        like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 14, video_id: 20, user_id: 13, parent_id: null, content: 'Dance cover đỉnh quá 🔥🔥',                    like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 15, video_id: 7,  user_id: 14, parent_id: null, content: 'Tutorial dễ hiểu, cảm ơn bạn nhiều!',          like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 16, video_id: 7,  user_id: 15, parent_id: 15,   content: 'Bạn có video nâng cao không?',                  like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 17, video_id: 7,  user_id: 7,  parent_id: 16,   content: 'Có nha! Mình sẽ ra phần 2 tuần sau',           like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 18, video_id: 30, user_id: 16, parent_id: null, content: 'Cay thật không bạn ơi 🌶️',                    like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 19, video_id: 27, user_id: 17, parent_id: null, content: 'Giọng hay lắm! Cover tiếp đi',                 like_count: 0, created_at: '2026-03-10 11:37:49' },
            { id: 20, video_id: 6,  user_id: 18, parent_id: null, content: 'Makeup đẹp quá, dùng son màu gì vậy?',         like_count: 0, created_at: '2026-03-10 11:37:49' },
        ])

        // ── VIDEO LIKES ────────────────────────────────────────────────────
        await queryInterface.bulkInsert('video_likes', [
            { user_id: 1, video_id: 4,  created_at: '2026-03-10 11:37:49' }, { user_id: 1, video_id: 5,  created_at: '2026-03-10 11:37:49' },
            { user_id: 1, video_id: 8,  created_at: '2026-03-10 11:37:49' }, { user_id: 1, video_id: 16, created_at: '2026-03-10 11:37:49' },
            { user_id: 1, video_id: 23, created_at: '2026-03-10 11:37:49' }, { user_id: 2, video_id: 3,  created_at: '2026-03-10 11:37:49' },
            { user_id: 2, video_id: 11, created_at: '2026-03-10 11:37:49' }, { user_id: 2, video_id: 15, created_at: '2026-03-10 11:37:49' },
            { user_id: 2, video_id: 20, created_at: '2026-03-10 11:37:49' }, { user_id: 2, video_id: 30, created_at: '2026-03-10 11:37:49' },
            { user_id: 3, video_id: 1,  created_at: '2026-03-10 11:37:49' }, { user_id: 3, video_id: 6,  created_at: '2026-03-10 11:37:49' },
            { user_id: 3, video_id: 13, created_at: '2026-03-10 11:37:49' }, { user_id: 3, video_id: 25, created_at: '2026-03-10 11:37:49' },
            { user_id: 4, video_id: 2,  created_at: '2026-03-10 11:37:49' }, { user_id: 4, video_id: 8,  created_at: '2026-03-10 11:37:49' },
            { user_id: 4, video_id: 16, created_at: '2026-03-10 11:37:49' }, { user_id: 4, video_id: 27, created_at: '2026-03-10 11:37:49' },
            { user_id: 5, video_id: 3,  created_at: '2026-03-10 11:37:49' }, { user_id: 5, video_id: 10, created_at: '2026-03-10 11:37:49' },
            { user_id: 5, video_id: 22, created_at: '2026-03-10 11:37:49' }, { user_id: 5, video_id: 26, created_at: '2026-03-10 11:37:49' },
            { user_id: 6, video_id: 2,  created_at: '2026-03-10 11:37:49' }, { user_id: 6, video_id: 8,  created_at: '2026-03-10 11:37:49' },
            { user_id: 6, video_id: 13, created_at: '2026-03-10 11:37:49' }, { user_id: 6, video_id: 25, created_at: '2026-03-10 11:37:49' },
            { user_id: 7, video_id: 7,  created_at: '2026-03-10 11:37:49' }, { user_id: 7, video_id: 19, created_at: '2026-03-10 11:37:49' },
            { user_id: 7, video_id: 29, created_at: '2026-03-10 11:37:49' }, { user_id: 8, video_id: 6,  created_at: '2026-03-10 11:37:49' },
            { user_id: 8, video_id: 11, created_at: '2026-03-10 11:37:49' }, { user_id: 8, video_id: 17, created_at: '2026-03-10 11:37:49' },
            { user_id: 9, video_id: 3,  created_at: '2026-03-10 11:37:49' }, { user_id: 9, video_id: 9,  created_at: '2026-03-10 11:37:49' },
            { user_id: 9, video_id: 18, created_at: '2026-03-10 11:37:49' }, { user_id: 9, video_id: 28, created_at: '2026-03-10 11:37:49' },
            { user_id: 10, video_id: 4,  created_at: '2026-03-10 11:37:49' }, { user_id: 10, video_id: 20, created_at: '2026-03-10 11:37:49' },
            { user_id: 10, video_id: 27, created_at: '2026-03-10 11:37:49' }, { user_id: 11, video_id: 2,  created_at: '2026-03-10 11:37:49' },
            { user_id: 11, video_id: 13, created_at: '2026-03-10 11:37:49' }, { user_id: 11, video_id: 21, created_at: '2026-03-10 11:37:49' },
            { user_id: 12, video_id: 5,  created_at: '2026-03-10 11:37:49' }, { user_id: 12, video_id: 16, created_at: '2026-03-10 11:37:49' },
            { user_id: 12, video_id: 23, created_at: '2026-03-10 11:37:49' }, { user_id: 13, video_id: 3,  created_at: '2026-03-10 11:37:49' },
            { user_id: 13, video_id: 12, created_at: '2026-03-10 11:37:49' }, { user_id: 13, video_id: 28, created_at: '2026-03-10 11:37:49' },
            { user_id: 14, video_id: 7,  created_at: '2026-03-10 11:37:49' }, { user_id: 14, video_id: 14, created_at: '2026-03-10 11:37:49' },
            { user_id: 14, video_id: 26, created_at: '2026-03-10 11:37:49' }, { user_id: 15, video_id: 4,  created_at: '2026-03-10 11:37:49' },
            { user_id: 15, video_id: 15, created_at: '2026-03-10 11:37:49' }, { user_id: 15, video_id: 20, created_at: '2026-03-10 11:37:49' },
        ])

        // ── VIDEO SAVES ────────────────────────────────────────────────────
        await queryInterface.bulkInsert('video_saves', [
            { user_id: 1, video_id: 3,  created_at: '2026-03-10 11:37:49' }, { user_id: 1, video_id: 15, created_at: '2026-03-10 11:37:49' },
            { user_id: 1, video_id: 23, created_at: '2026-03-10 11:37:49' }, { user_id: 2, video_id: 8,  created_at: '2026-03-10 11:37:49' },
            { user_id: 2, video_id: 16, created_at: '2026-03-10 11:37:49' }, { user_id: 2, video_id: 25, created_at: '2026-03-10 11:37:49' },
            { user_id: 3, video_id: 4,  created_at: '2026-03-10 11:37:49' }, { user_id: 3, video_id: 11, created_at: '2026-03-10 11:37:49' },
            { user_id: 3, video_id: 20, created_at: '2026-03-10 11:37:49' }, { user_id: 4, video_id: 3,  created_at: '2026-03-10 11:37:49' },
            { user_id: 4, video_id: 13, created_at: '2026-03-10 11:37:49' }, { user_id: 4, video_id: 27, created_at: '2026-03-10 11:37:49' },
            { user_id: 5, video_id: 8,  created_at: '2026-03-10 11:37:49' }, { user_id: 5, video_id: 15, created_at: '2026-03-10 11:37:49' },
            { user_id: 5, video_id: 30, created_at: '2026-03-10 11:37:49' }, { user_id: 6, video_id: 3,  created_at: '2026-03-10 11:37:49' },
            { user_id: 6, video_id: 21, created_at: '2026-03-10 11:37:49' }, { user_id: 7, video_id: 7,  created_at: '2026-03-10 11:37:49' },
            { user_id: 7, video_id: 29, created_at: '2026-03-10 11:37:49' }, { user_id: 8, video_id: 6,  created_at: '2026-03-10 11:37:49' },
            { user_id: 8, video_id: 17, created_at: '2026-03-10 11:37:49' }, { user_id: 9, video_id: 9,  created_at: '2026-03-10 11:37:49' },
            { user_id: 9, video_id: 28, created_at: '2026-03-10 11:37:49' }, { user_id: 10, video_id: 4, created_at: '2026-03-10 11:37:49' },
            { user_id: 10, video_id: 20, created_at: '2026-03-10 11:37:49' },
        ])

        // ── VIDEO REPOSTS ──────────────────────────────────────────────────
        await queryInterface.bulkInsert('video_reposts', [
            { user_id: 1,  video_id: 16, created_at: '2026-03-10 11:37:49' }, { user_id: 2,  video_id: 23, created_at: '2026-03-10 11:37:49' },
            { user_id: 3,  video_id: 4,  created_at: '2026-03-10 11:37:49' }, { user_id: 4,  video_id: 5,  created_at: '2026-03-10 11:37:49' },
            { user_id: 5,  video_id: 3,  created_at: '2026-03-10 11:37:49' }, { user_id: 6,  video_id: 8,  created_at: '2026-03-10 11:37:49' },
            { user_id: 7,  video_id: 15, created_at: '2026-03-10 11:37:49' }, { user_id: 8,  video_id: 11, created_at: '2026-03-10 11:37:49' },
            { user_id: 9,  video_id: 20, created_at: '2026-03-10 11:37:49' }, { user_id: 10, video_id: 30, created_at: '2026-03-10 11:37:49' },
        ])

        // ── NOTIFICATIONS ──────────────────────────────────────────────────
        await queryInterface.bulkInsert('notifications', [
            { id: 1,  user_id: 5,  actor_id: 1, video_id: 4,  type: 'like',    is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 2,  user_id: 12, actor_id: 1, video_id: 5,  type: 'like',    is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 3,  user_id: 11, actor_id: 2, video_id: 3,  type: 'comment', is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 4,  user_id: 6,  actor_id: 3, video_id: 8,  type: 'comment', is_read: 1, created_at: '2026-03-10 11:37:49' },
            { id: 5,  user_id: 2,  actor_id: 4, video_id: null, type: 'follow', is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 6,  user_id: 1,  actor_id: 5, video_id: null, type: 'follow', is_read: 1, created_at: '2026-03-10 11:37:49' },
            { id: 7,  user_id: 3,  actor_id: 6, video_id: null, type: 'friend', is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 8,  user_id: 1,  actor_id: 7, video_id: null, type: 'friend', is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 9,  user_id: 8,  actor_id: 1, video_id: 16, type: 'save',    is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 10, user_id: 13, actor_id: 2, video_id: 15, type: 'save',    is_read: 1, created_at: '2026-03-10 11:37:49' },
            { id: 11, user_id: 7,  actor_id: 3, video_id: 4,  type: 'like',    is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 12, user_id: 9,  actor_id: 4, video_id: 3,  type: 'comment', is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 13, user_id: 10, actor_id: 5, video_id: 16, type: 'repost',  is_read: 0, created_at: '2026-03-10 11:37:49' },
            { id: 14, user_id: 11, actor_id: 6, video_id: 23, type: 'like',    is_read: 1, created_at: '2026-03-10 11:37:49' },
            { id: 15, user_id: 12, actor_id: 7, video_id: 19, type: 'follow',  is_read: 0, created_at: '2026-03-10 11:37:49' },
        ])

        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')

        await queryInterface.bulkDelete('notifications',        null, {})
        await queryInterface.bulkDelete('video_reposts',        null, {})
        await queryInterface.bulkDelete('video_saves',          null, {})
        await queryInterface.bulkDelete('video_likes',          null, {})
        await queryInterface.bulkDelete('comments',             null, {})
        await queryInterface.bulkDelete('messages',             null, {})
        await queryInterface.bulkDelete('conversation_members', null, {})
        await queryInterface.bulkDelete('conversations',        null, {})
        await queryInterface.bulkDelete('friendships',          null, {})
        await queryInterface.bulkDelete('follows',              null, {})
        await queryInterface.bulkDelete('video_hashtags',       null, {})
        await queryInterface.bulkDelete('hashtags',             null, {})
        await queryInterface.bulkDelete('videos',               null, {})
        await queryInterface.bulkDelete('users',                null, {})

        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    },
}
