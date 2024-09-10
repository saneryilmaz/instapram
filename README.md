# Instapram

Instapram, Instagram'da otomatik takip ve takipten çıkma işlemlerini gerçekleştiren bir Node.js uygulamasıdır. Bu proje Puppeteer ve Axios kütüphanelerini kullanarak Instagram'a giriş yapar ve kullanıcıları takip eder veya takipten çıkarır.

## Özellikler

- **Otomatik Giriş:** Instagram'a kullanıcı adı ve şifre ile giriş yapar.
- **Takip Etme:** Belirtilen kullanıcıyı takip eder.
- **Takipten Çıkma:** Belirtilen kullanıcıyı takipten çıkarır.

## Gereksinimler

- Node.js
- Puppeteer
- Axios

## Kurulum

1. Bu projeyi klonlayın veya indirin:
    ```bash
    git clone https://github.com/kullaniciadi/instapram.git
    ```

2. Proje dizinine gidin:
    ```bash
    cd instapram
    ```

3. Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

## Kullanım

1. `Instapram` sınıfını oluşturun:
    ```javascript
    const Instapram = require('instapram');

    const insta = new Instapram('KULLANICI_ADI', 'KULLANICI_SIFRE');
    ```

2. Instagram'a giriş yapın:
    ```javascript
    insta.login().then(() => {
        console.log('Giriş başarılı');
    }).catch(error => {
        console.error('Giriş başarısız:', error);
    });
    ```

3. Kullanıcıyı takip edin:
    ```javascript
    insta.follow('hedef_kullanici').then(response => {
        console.log('Takip etme başarılı:', response);
    }).catch(error => {
        console.error('Takip etme başarısız:', error);
    });
    ```

4. Kullanıcıyı takipten çıkarın:
    ```javascript
    insta.unfollow('hedef_kullanici').then(response => {
        console.log('Takipten çıkarma başarılı:', response);
    }).catch(error => {
        console.error('Takipten çıkarma başarısız:', error);
    });
    ```

## Yapıcı Sınıf

### `Instapram`

- **Özellikler:**
  - `username`: Instagram kullanıcı adı.
  - `password`: Instagram şifresi.
  - `cookies`: Giriş işleminden sonra alınan çerezler.
  - `csrftoken`: CSRF tokeni.

- **Metodlar:**
  - `login()`: Instagram'a giriş yapar ve çerezleri alır.
  - `follow(username)`: Belirtilen kullanıcıyı takip eder.
  - `unfollow(username)`: Belirtilen kullanıcıyı takipten çıkarır.

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

## İletişim

Herhangi bir sorun veya öneri için [email@domain.com](mailto:email@domain.com) adresinden iletişime geçebilirsiniz.
