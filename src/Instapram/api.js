const puppeteer = require('puppeteer');
const axios = require("axios")

class Instapram {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.cookies = "";
        this.csrftoken = "";
        this.browser = null;
        this.page = null;
    }

    async login() {
        this.browser = await puppeteer.launch({ headless: true });
        this.page = await this.browser.newPage();

        if (!this.page) {
            throw new Error('Page not initialized. Call init() first.');
        }

        try {
            await this.page.goto('https://www.instagram.com/accounts/login/', {
                waitUntil: 'networkidle2',
            });

            await this.page.type('input[name="username"]', this.username);
            await this.page.type('input[name="password"]', this.password);
            await this.page.click('button[type="submit"]');

            await this.page.waitForNavigation();

            const cookies = await this.page.cookies();

            this.cookies = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
            const csrfCookie = cookies.find(cookie => cookie.name === 'csrftoken');
            if (csrfCookie) {
                this.csrftoken = csrfCookie.value;
            }
            await this.browser.close();
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    }
    async follow(username) {
        try {
            const response = await axios.get('https://www.instagram.com/web/search/topsearch/', {
            params: {
                'query': username
            },
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'tr-TR,tr;q=0.9',
                'cache-control': 'max-age=0',
                'cookie': 'mid=Zt_gmAALAAHyOFqdeL_H0gjZ-55a; datr=mODfZtoYt-zt-UZwFDy0V_ew; ig_did=683236AB-E8C2-4CFE-AF13-FDE1F1F42172; csrftoken=4Fl7FfWlBM4nccV079roSQlqCGoUFWKO; ds_user_id=63993893904; sessionid=63993893904%3ABoQitF8ZK5m7fm%3A23%3AAYerSMPUQWAc9SxhC5Gi8RT44KYGcevlVknuH0SeBA; ps_l=1; ps_n=1; shbid="10360\\05463993893904\\0541757484082:01f7145659090041a4d4349a6691b4ee3a9685744fbab24596280be9a806b01863bbb941"; shbts="1725948082\\05463993893904\\0541757484082:01f7e4bb038dde9d60dc071484db23cb89cf410a76f90de97a97fd9f12541f1144f4663f"; wd=1920x919; rur="LDC\\05463993893904\\0541757485241:01f78d7152536e2142055859a6e482e1cf38716fbe0ca9d7c86a17730456161ab00220ac"',
                'dpr': '1',
                'priority': 'u=0, i',
                'sec-ch-prefers-color-scheme': 'dark',
                'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                'sec-ch-ua-full-version-list': '"Chromium";v="128.0.6613.120", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-model': '""',
                'sec-ch-ua-platform': '"Windows"',
                'sec-ch-ua-platform-version': '"10.0.0"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'viewport-width': '1267'
            }
            });
            const config = {
                method: 'post',
                url: 'https://www.instagram.com/graphql/query',
                headers: {
                    'accept': '*/*',
                    'accept-language': 'tr-TR,tr;q=0.9',
                    'content-type': 'application/x-www-form-urlencoded',
                    'cookie': this.cookies,
                    'origin': 'https://www.instagram.com',
                    'priority': 'u=1, i',
                    'referer': `https://www.instagram.com/${username}/`,
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                    'sec-ch-ua-full-version-list': '"Chromium";v="128.0.6613.120", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.120"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"10.0.0"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                    'x-asbd-id': '129477',
                    'x-bloks-version-id': 'aca980884899d39791baf38b7c91bbbc7d6670b23530018fd401d7c01612d1c2',
                    'x-csrftoken': this.csrftoken,
                    'x-fb-friendly-name': 'usePolarisFollowMutation',
                    'x-fb-lsd': 'rfK_sXy6DpPKK8xeiL3fct',
                    'x-ig-app-id': '936619743392459',
                },
                data: `av=17841464017139236&__d=www&__user=0&__a=1&__req=1d&__hs=19976.HYP%3Ainstagram_web_pkg.2.1..0.1&dpr=1&__ccg=UNKNOWN&__rev=1016355591&__s=cc5rw0%3A2j9mhq%3Auarqei&__hsi=7412893046905537823&__dyn=7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0k24o0B-q1ew65xO0FE2awgo9oO0n24oaEnxO1ywOwv89k2C1Fwc60D87u3ifK0EUjwGzEaE2iwNwmE2eUlwhEe87q7U1mVEbUGdG1QwTU9UaQ0Lo6-3u2WE5B08-269wr86C1mwPwUQp1yUb9UK6V8aUuwm9EO6UaU4W&__csr=gthdgBsIJggh4aNf97NB8TbkCAhIF5FF9rZ5WbLZ4ZkhqTFdZ_aQiFmihJvXBqhAWLppaX8rRlaWqzahauAeC_GGCDKCCqiiA4bGuquUmiCCG6d4ByfgRavVFoTyLCG9LACCCyHCK9KVk9hXx64Egxa9ypGx62y00j4QE2Ow5mg0FO0EEmwku0ZS4FU1lGbxNamm02GS2Gohc2-gw5lsV9FUlAtwKwbcE1vEjwvUx3U8Q4Uh2J4UG9a0gG1SwVwk88ECUdo144mtgwE8Q2o90oE0QUOzbgjU0d7o04Ua08dw&__comet_req=7&fb_dtsg=NAcOXsIte4fsSJxgEU77p6kBm7ZDwKXlxENO_-EFWlWaILL8MjEoerA%3A17854477105113577%3A1725948076&jazoest=26240&lsd=rfK_sXy6DpPKK8xeiL3fct&__spin_r=1016355591&__spin_b=trunk&__spin_t=1725948659&qpl_active_flow_ids=379204720&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=usePolarisFollowMutation&variables=%7B%22target_user_id%22%3A%22${response.data.users[0].user.id}%22%2C%22container_module%22%3A%22profile%22%2C%22nav_chain%22%3A%22PolarisProfilePostsTabRoot%3AprofilePage%3A4%3Aunexpected%22%7D&server_timestamps=true&doc_id=7275591572570580&fb_api_analytics_tags=%5B%22qpl_active_flow_ids%3D379204720%22%5D`
            };

            axios(config).then(response => {return JSON.stringify(response.data)})
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    }
    async unfollow(username) {
        try {
            const response = await axios.get('https://www.instagram.com/web/search/topsearch/', {
            params: {
                'query': username
            },
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'tr-TR,tr;q=0.9',
                'cache-control': 'max-age=0',
                'cookie': 'mid=Zt_gmAALAAHyOFqdeL_H0gjZ-55a; datr=mODfZtoYt-zt-UZwFDy0V_ew; ig_did=683236AB-E8C2-4CFE-AF13-FDE1F1F42172; csrftoken=4Fl7FfWlBM4nccV079roSQlqCGoUFWKO; ds_user_id=63993893904; sessionid=63993893904%3ABoQitF8ZK5m7fm%3A23%3AAYerSMPUQWAc9SxhC5Gi8RT44KYGcevlVknuH0SeBA; ps_l=1; ps_n=1; shbid="10360\\05463993893904\\0541757484082:01f7145659090041a4d4349a6691b4ee3a9685744fbab24596280be9a806b01863bbb941"; shbts="1725948082\\05463993893904\\0541757484082:01f7e4bb038dde9d60dc071484db23cb89cf410a76f90de97a97fd9f12541f1144f4663f"; wd=1920x919; rur="LDC\\05463993893904\\0541757485241:01f78d7152536e2142055859a6e482e1cf38716fbe0ca9d7c86a17730456161ab00220ac"',
                'dpr': '1',
                'priority': 'u=0, i',
                'sec-ch-prefers-color-scheme': 'dark',
                'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                'sec-ch-ua-full-version-list': '"Chromium";v="128.0.6613.120", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-model': '""',
                'sec-ch-ua-platform': '"Windows"',
                'sec-ch-ua-platform-version': '"10.0.0"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'viewport-width': '1267'
            }
            });
            const config = {
                method: 'post',
                url: 'https://www.instagram.com/graphql/query',
                headers: {
                    'accept': '*/*',
                    'accept-language': 'tr-TR,tr;q=0.9',
                    'content-type': 'application/x-www-form-urlencoded',
                    'cookie': this.cookies,
                    'origin': 'https://www.instagram.com',
                    'priority': 'u=1, i',
                    'referer': 'https://www.instagram.com/godlessturtletr/',
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                    'sec-ch-ua-full-version-list': '"Chromium";v="128.0.6613.120", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.120"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"10.0.0"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                    'x-asbd-id': '129477',
                    'x-bloks-version-id': 'aca980884899d39791baf38b7c91bbbc7d6670b23530018fd401d7c01612d1c2',
                    'x-csrftoken': this.csrftoken,
                    'x-fb-friendly-name': 'usePolarisUnfollowMutation',
                    'x-fb-lsd': 'fYe8vS-CEEirV1Qd1kARab',
                    'x-ig-app-id': '936619743392459',
                },
                data: `av=17841464017139236&__d=www&__user=0&__a=1&__req=27&__hs=19976.HYP%3Ainstagram_web_pkg.2.1..0.1&dpr=1&__ccg=UNKNOWN&__rev=1016355591&__s=wm1c5o%3Axcmoj5%3Aycdoen&__hsi=7412897065163889838&__dyn=7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0k24o0B-q1ew65xO0FE2awgo9oO0n24oaEnxO1ywOwv89k2C1Fwc60AEC1TwQzXwae4UaEW2G0AEco5G0zK5o4q3y1Sx-0lKq2-azqwt8d-2u2J0bS1LwTwKG1pg2fwxyo6O1FwlEcUed6goK2OubxKi2qi7E5yqcxK2K1ew&__csr=gthdgBsnk44h2IjOhYpidOR9F4rahqqinThuyX_hfl4mJWjvbOJKFnGhJvXBqhAWLp4iKO6ZliKCAbFqFWh8Cr-GGqpeCCqiiA4bGuquWxdaqqEoQim8Zz4ArVFoTyLBiyrV9FFEFaqUCQFk9hXQ8Bxaibxa9ypGx62y00j4QE2Ow5mg0FO0EEmwku0ZS4Aq0lqyUsiBBw1GW0f-wGC4j0LA81lneiqu5p7obE2Pai0nC4U7-8l388Q4Uh2J4UG9a0gG1SwVwk88ECUdo3QgqhpR22wzg9wA1yw3jzacJ1fw0Qtw0jwE0wS&__comet_req=7&fb_dtsg=NAcNZzlKyUQHCh_64nTeGsYiuQiCc2zZ89FFNO0bq4o4oDliR87sw8A%3A17854477105113577%3A1725948076&jazoest=26210&lsd=fYe8vS-CEEirV1Qd1kARab&__spin_r=1016355591&__spin_b=trunk&__spin_t=1725949595&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=usePolarisUnfollowMutation&variables=%7B%22target_user_id%22%3A%22${response.data.users[0].user.id}%22%2C%22container_module%22%3A%22profile%22%2C%22nav_chain%22%3A%22PolarisProfilePostsTabRoot%3AprofilePage%3A5%3Atopnav-link%2CPolarisProfilePostsTabRoot%3AprofilePage%3A6%3Aunexpected%2CPolarisProfilePostsTabRoot%3AprofilePage%3A7%3Aunexpected%22%7D&server_timestamps=true&doc_id=25474677615509423`
            };

            axios(config).then(response => {return JSON.stringify(response.data)})
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    }
    async getProfilePic(username) {
        try {
            const response = await axios.get('https://www.instagram.com/web/search/topsearch/', {
            params: {
                'query': username
            },
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'tr-TR,tr;q=0.9',
                'cache-control': 'max-age=0',
                'cookie': 'mid=Zt_gmAALAAHyOFqdeL_H0gjZ-55a; datr=mODfZtoYt-zt-UZwFDy0V_ew; ig_did=683236AB-E8C2-4CFE-AF13-FDE1F1F42172; csrftoken=4Fl7FfWlBM4nccV079roSQlqCGoUFWKO; ds_user_id=63993893904; sessionid=63993893904%3ABoQitF8ZK5m7fm%3A23%3AAYerSMPUQWAc9SxhC5Gi8RT44KYGcevlVknuH0SeBA; ps_l=1; ps_n=1; shbid="10360\\05463993893904\\0541757484082:01f7145659090041a4d4349a6691b4ee3a9685744fbab24596280be9a806b01863bbb941"; shbts="1725948082\\05463993893904\\0541757484082:01f7e4bb038dde9d60dc071484db23cb89cf410a76f90de97a97fd9f12541f1144f4663f"; wd=1920x919; rur="LDC\\05463993893904\\0541757485241:01f78d7152536e2142055859a6e482e1cf38716fbe0ca9d7c86a17730456161ab00220ac"',
                'dpr': '1',
                'priority': 'u=0, i',
                'sec-ch-prefers-color-scheme': 'dark',
                'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                'sec-ch-ua-full-version-list': '"Chromium";v="128.0.6613.120", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-model': '""',
                'sec-ch-ua-platform': '"Windows"',
                'sec-ch-ua-platform-version': '"10.0.0"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'viewport-width': '1267'
            }
            });
            return response.data.users[0].user.profile_pic_url
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    }
    async getUserId(username) {
        try {
            const response = await axios.get('https://www.instagram.com/web/search/topsearch/', {
            params: {
                'query': username
            },
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'tr-TR,tr;q=0.9',
                'cache-control': 'max-age=0',
                'cookie': 'mid=Zt_gmAALAAHyOFqdeL_H0gjZ-55a; datr=mODfZtoYt-zt-UZwFDy0V_ew; ig_did=683236AB-E8C2-4CFE-AF13-FDE1F1F42172; csrftoken=4Fl7FfWlBM4nccV079roSQlqCGoUFWKO; ds_user_id=63993893904; sessionid=63993893904%3ABoQitF8ZK5m7fm%3A23%3AAYerSMPUQWAc9SxhC5Gi8RT44KYGcevlVknuH0SeBA; ps_l=1; ps_n=1; shbid="10360\\05463993893904\\0541757484082:01f7145659090041a4d4349a6691b4ee3a9685744fbab24596280be9a806b01863bbb941"; shbts="1725948082\\05463993893904\\0541757484082:01f7e4bb038dde9d60dc071484db23cb89cf410a76f90de97a97fd9f12541f1144f4663f"; wd=1920x919; rur="LDC\\05463993893904\\0541757485241:01f78d7152536e2142055859a6e482e1cf38716fbe0ca9d7c86a17730456161ab00220ac"',
                'dpr': '1',
                'priority': 'u=0, i',
                'sec-ch-prefers-color-scheme': 'dark',
                'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
                'sec-ch-ua-full-version-list': '"Chromium";v="128.0.6613.120", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-model': '""',
                'sec-ch-ua-platform': '"Windows"',
                'sec-ch-ua-platform-version': '"10.0.0"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'viewport-width': '1267'
            }
            });
            return response.data.users[0].user.id
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    }
}

module.exports = Instapram;
