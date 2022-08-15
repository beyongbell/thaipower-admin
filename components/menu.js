export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboard.text",
        icon: "uil-tachometer-fast",
        badge: {
            variant: "info",
            text: "menuitems.dashboard.badge"
        },
        link: "/"
    },
    {
        id: 4,
        label: "menuitems.cmsiwebsite.text",
        icon: "uil-grid",
        subItems: [
            {
                id: 5,
                label: "menuitems.cmsiwebsite.list.popup",
                link: "/",
                parentId: 4
            },
            {
                id: 6,
                label: "menuitems.cmsiwebsite.list.herobanner",
                link: "/",
                parentId: 4
            },
            {
                id: 7,
                label: "menuitems.cmsiwebsite.list.story",
                link: "/",
                parentId: 4
            },
            {
                id: 8,
                label: "menuitems.cmsiwebsite.list.recommend",
                link: "/",
                parentId: 4
            },
            {
                id: 9,
                label: "menuitems.cmsiwebsite.list.about",
                link: "/",
                parentId: 4
            },
            {
                id: 10,
                label: "menuitems.cmsiwebsite.list.faq",
                link: "/",
                parentId: 4
            },
            {
                id: 10,
                label: "menuitems.cmsiwebsite.list.privacypolicy",
                link: "/",
                parentId: 4
            },
            {
                id: 11,
                label: "menuitems.cmsiwebsite.list.contactus",
                link: "/",
                parentId: 4
            },
        ]
    },
    {
        id: 12,
        label: "menuitems.cmsishop.text",
        icon: "uil-store-alt",
        subItems: [
            {
                id: 13,
                label: "menuitems.cmsishop.list.shopBanner",
                link: "/",
                parentId: 12
            },
            {
                id: 14,
                label: "menuitems.cmsishop.list.category",
                link: "/",
                parentId: 12
            },
            {
                id: 15,
                label: "menuitems.cmsishop.list.shop",
                link: "/",
                parentId: 12
            },
            {
                id: 16,
                label: "menuitems.cmsishop.list.sku",
                link: "/",
                parentId: 12
            },
            {
                id: 17,
                label: "menuitems.cmsishop.list.speacial",
                link: "/",
                parentId: 12
            },
            {
                id: 18,
                label: "menuitems.cmsishop.list.collection",
                link: "/",
                parentId: 12
            },
        ]
    },
    {
        id: 19,
        label: "menuitems.cmsistory.text",
        icon: "uil-play-circle",
        subItems: [
            {
                id: 20,
                label: "menuitems.cmsistory.list.storybanner",
                link: "/",
                parentId: 19
            },
            {
                id: 21,
                label: "menuitems.cmsistory.list.storyhighlight",
                link: "/",
                parentId: 19
            },
            {
                id: 22,
                label: "menuitems.cmsistory.list.storydetail",
                link: "/",
                parentId: 19
            },
        ]
    },
    {
        id: 23,
        label: "menuitems.fleamarket.text",
        icon: "fas fa-hand-holding-heart",
        subItems: [
            {
                id: 24,
                label: "menuitems.fleamarket.list.fleamarketbanner",
                link: "/",
                parentId: 23
            },
            {
                id: 25,
                label: "menuitems.fleamarket.list.category",
                link: "/",
                parentId: 23
            },
            {
                id: 26,
                label: "menuitems.fleamarket.list.shop",
                link: "/",
                parentId: 23
            },
            {
                id: 27,
                label: "menuitems.fleamarket.list.sku",
                link: "/",
                parentId: 23
            },
        ]
    },
    {
        id: 28,
        label: "menuitems.ecommerce.text",
        icon: "uil-shopping-cart-alt",
        subItems: [
            {
                id: 29,
                label: "menuitems.ecommerce.list.order",
                link: "/",
                parentId: 28
            },
            {
                id: 30,
                label: "menuitems.ecommerce.list.stock",
                link: "/",
                parentId: 28
            },
        ]
    },
    {
        id: 31,
        label: "menuitems.brandcenter.text",
        icon: "far fa-smile",
        subItems: [
            {
                id: 32,
                label: "menuitems.brandcenter.list.brandlist",
                link: "/",
                parentId: 31
            },
            {
                id: 33,
                label: "menuitems.brandcenter.list.educationhub",
                link: "/",
                parentId: 31
            },
        ]
    },
    {
        id: 34,
        label: "menuitems.report.text",
        icon: "uil-analytics",
        subItems: [
            {
                id: 35,
                label: "menuitems.report.list.saleorder",
                link: "/icons/boxicons",
                parentId: 34
            },
            {
                id: 36,
                label: "menuitems.report.list.stockmovement",
                link: "/icons/fontawesome",
                parentId: 34
            },
            {
                id: 37,
                label: "menuitems.report.list.brand",
                link: "/icons/unicons",
                parentId: 34
            },
        ]
    },
    {
        id: 38,
        label: "menuitems.setting.text",
        icon: "uil-cog",
        subItems: [
            {
                id: 39,
                label: "menuitems.setting.list.userrole",
                link: "/user",
                parentId: 38
            },
        ]
    },
];

