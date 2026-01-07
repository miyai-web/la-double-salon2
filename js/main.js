/**
 * LA DOUBLE Salon - Main JavaScript
 * メニューの開閉とスムーズスクロール処理を管理します。
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.getElementById('navMenu');
    const closeBtn = document.querySelector('.nav-close-btn');
    const logo = document.querySelector('.logo');
    const navLinks = navMenu?.querySelectorAll('a');

    // 必須要素がない場合は処理を中断
    if (!menuBtn || !navMenu) {
        console.warn('メニュー要素が見つかりません');
        return;
    }

    let isMenuOpen = false;

    // --- メニュー開閉処理 ---
    
    /**
     * メニューを開きます
     */
    function openMenu() {
        navMenu.classList.add('active');
        menuBtn.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // スクロール防止
        isMenuOpen = true;
    }
    
    /**
     * メニューを閉じます
     */
    function closeMenu() {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // スクロール復元
        isMenuOpen = false;
    }
    
    /**
     * メニューの状態を切り替えます
     */
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // ハンバーガーボタンクリック
    menuBtn.addEventListener('click', toggleMenu);
    
    // ×ボタンクリック
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !navMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // --- スムーズスクロール処理 ---
    
    /**
     * 指定された要素へスムーズにスクロールします
     * @param {string} selector - スクロール先の要素のCSSセレクタ
     */
    function scrollToSection(selector) {
        const target = document.querySelector(selector);
        
        if (target) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ナビゲーションリンクにスムーズスクロールを適用
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // ハッシュリンク（#で始まる）の場合のみスムーズスクロール
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(href);
                }
                
                // メニューを閉じる
                closeMenu();
            });
        });
    }

    // ロゴクリックで最上部へスムーズスクロール（index.htmlのみ）
    if (logo && logo.tagName === 'DIV') {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            closeMenu();
        });
    }

    // ロゴリンク（aタグ）の場合は通常のリンク動作
    if (logo && logo.tagName === 'A') {
        // index.html以外のページではページ遷移するので何もしない
        // index.htmlでは自分自身へのリンクなので、スムーズスクロールを追加
        logo.addEventListener('click', (e) => {
            if (window.location.pathname.endsWith('index.html') || 
                window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            closeMenu();
        });
    }
});     