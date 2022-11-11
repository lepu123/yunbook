export const search = [
    {
        type: 'sort',
        list: [
            {
                value: 0,
                name: '综合排序',
            },
            {
                value: 1,
                name: '销量最高',
            },
            {
                value: 2,
                name: '人气最旺',
            },
            {
                value: 3,
                name: '最新上架',
            },
            {
                value: 4,
                name: '最近更新',
            },
        ]
    },
    {
        type: 'channel',
        list: [
            {
                value: 0,
                name: '全部频道',
            }, {
                value: 1,
                name: '男生',
            }, {
                value: 2,
                name: '女生',
            },
            {
                value: 3,
                name: '出版',
            },
        ]
    },
    {
        type: 'filter',
        list: [
            {
                filterType: 'bookStatus',
                typeName: '完结状态',
                fList: [
                    {
                        value: 0,
                        name: '全部',
                    },
                    {
                        value: 1,
                        name: '完结',
                    },
                    {
                        value: 2,
                        name: '连载',
                    }
                ]
            },
            {
                filterType: 'pay',
                typeName: '书籍价格',
                fList: [
                    {
                        value: 0,
                        name: '全部',
                    },
                    {
                        value: 1,
                        name: '免费',
                    },
                    {
                        value: 2,
                        name: '包月',
                    },
                    {
                        value: 3,
                        name: '收费',
                    }
                ]
            },
            {
                filterType: 'wordCount',
                typeName: '书籍字数',
                fList: [
                    {
                        value: 0,
                        name: '全部',
                    },
                    {
                        value: 1,
                        name: '30万字以下',
                    },
                    {
                        value: 2,
                        name: '30-50万字',
                    },
                    {
                        value: 3,
                        name: '50-100万字',
                    },
                    {
                        value: 4,
                        name: '100万字以上',
                    }
                ]
            }
        ]
    }

]