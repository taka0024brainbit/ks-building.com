// スクロールアニメーション
document.addEventListener('DOMContentLoaded', () => {
    // スクロールアニメーション用の要素を取得
    const animatedElements = document.querySelectorAll('.service-card, .section__title');
    
    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // 各要素を監視
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ヘッダーのスクロール制御
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // 下スクロール
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // 上スクロール
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // ハンバーガーメニュー
    const menuButton = document.querySelector('.header__menu-button');
    const nav = document.querySelector('.header__nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            // メニュー表示時に背景スクロールを禁止する場合 (任意)
            // document.body.classList.toggle('no-scroll');
        });

        // メニュー項目クリック時にメニューを閉じる (任意)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // ページ内リンクでない場合、またはメニューが開いている場合のみ閉じる
                // (ページ内リンクの場合はスムーズスクロールが動作するため閉じない方が良い場合もある)
                if (link.getAttribute('href').startsWith('/') || nav.classList.contains('is-active')) {
                   if (nav.classList.contains('is-active')) {
                        menuButton.classList.remove('is-active');
                        nav.classList.remove('is-active');
                        // document.body.classList.remove('no-scroll');
                    }
                }
            });
        });
    }
}); 