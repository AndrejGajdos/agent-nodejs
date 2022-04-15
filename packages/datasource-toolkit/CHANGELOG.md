# @forestadmin/datasource-toolkit [1.0.0-beta.3](https://github.com/ForestAdmin/agent-nodejs/compare/@forestadmin/datasource-toolkit@1.0.0-beta.2...@forestadmin/datasource-toolkit@1.0.0-beta.3) (2022-04-15)


### Bug Fixes

* add comment on BaseCollection ([59017ea](https://github.com/ForestAdmin/agent-nodejs/commit/59017eac9819afbd02c555869743160afcf7c9b0))

# @forestadmin/datasource-toolkit [1.0.0-beta.2](https://github.com/ForestAdmin/agent-nodejs/compare/@forestadmin/datasource-toolkit@1.0.0-beta.1...@forestadmin/datasource-toolkit@1.0.0-beta.2) (2022-04-15)


### Bug Fixes

* enable npm, git and github distribution ([bd91825](https://github.com/ForestAdmin/agent-nodejs/commit/bd91825f4d185874a259da28b0f7a6c7f557196d))

# @forestadmin/datasource-toolkit 1.0.0-beta.1 (2022-04-14)


### Bug Fixes

* add 'not' condition tree branch ([#64](https://github.com/ForestAdmin/agent-nodejs/issues/64)) ([3569192](https://github.com/ForestAdmin/agent-nodejs/commit/3569192b691d8692190f5f32fb75a6b9081d3acf))
* avoid name conflict for collections in datasources ([#48](https://github.com/ForestAdmin/agent-nodejs/issues/48)) ([fac2ffc](https://github.com/ForestAdmin/agent-nodejs/commit/fac2ffcdf86739318ca460a73c6d4f83f2961d61))
* cache schemas on decorators ([#217](https://github.com/ForestAdmin/agent-nodejs/issues/217)) ([0ccc45e](https://github.com/ForestAdmin/agent-nodejs/commit/0ccc45e33918641788508c77b8916287f22d616c))
* **condition-tree:** no longer crash when condition tree is null ([#86](https://github.com/ForestAdmin/agent-nodejs/issues/86)) ([7d0673f](https://github.com/ForestAdmin/agent-nodejs/commit/7d0673f3c2e3a2059e16c85ec4b59e2235d1f092))
* enable npm, git and github distribution ([bd91825](https://github.com/ForestAdmin/agent-nodejs/commit/bd91825f4d185874a259da28b0f7a6c7f557196d))
* error on complex field validation ([#106](https://github.com/ForestAdmin/agent-nodejs/issues/106)) ([6f098f6](https://github.com/ForestAdmin/agent-nodejs/commit/6f098f6721b656cf8c00a0bcf77bd7ecda30aec5))
* improve relation schema creation ([#238](https://github.com/ForestAdmin/agent-nodejs/issues/238)) ([cf9bfbf](https://github.com/ForestAdmin/agent-nodejs/commit/cf9bfbf83ea27c56eadbeb87a2d16cb1b66b355e))
* **interfaces:** make schema fields optional and fix typos ([#3](https://github.com/ForestAdmin/agent-nodejs/issues/3)) ([542badc](https://github.com/ForestAdmin/agent-nodejs/commit/542badccfd4d3871bce27d2f49f60354a35de2d4))
* leaderboard chart broken when using computed decorator ([#170](https://github.com/ForestAdmin/agent-nodejs/issues/170)) ([cea9f1a](https://github.com/ForestAdmin/agent-nodejs/commit/cea9f1a1834492c2288af183e0c5675e400ced6f))
* null pointer exception on sort-emulate ([#111](https://github.com/ForestAdmin/agent-nodejs/issues/111)) ([5b37a5f](https://github.com/ForestAdmin/agent-nodejs/commit/5b37a5f9ccc0a1f619da8439dfc29341fc0b9baa))
* **operator-emulate:** lists with no filters are no longer allowed ([#124](https://github.com/ForestAdmin/agent-nodejs/issues/124)) ([1716dc8](https://github.com/ForestAdmin/agent-nodejs/commit/1716dc824a01358cd72bc6072ca11910e410a032))
* record validator by replacing oneToMany to manyToOne ([#176](https://github.com/ForestAdmin/agent-nodejs/issues/176)) ([ab7dfd8](https://github.com/ForestAdmin/agent-nodejs/commit/ab7dfd8a36271365b4399ecab6cbd380cfb36acc))
* remove cast to string, which breaks aggregation emulator ([#123](https://github.com/ForestAdmin/agent-nodejs/issues/123)) ([c03d6cd](https://github.com/ForestAdmin/agent-nodejs/commit/c03d6cdd96a64d46711055574255ec63d9614206))
* **rename:** getById implementation, and null reference handling ([#85](https://github.com/ForestAdmin/agent-nodejs/issues/85)) ([ed2cfa6](https://github.com/ForestAdmin/agent-nodejs/commit/ed2cfa6aa9f6f1d3580d76a5b82f7ec6bc90a754))
* **route-update:** build projection correctly when there are relations ([#190](https://github.com/ForestAdmin/agent-nodejs/issues/190)) ([f8b83d0](https://github.com/ForestAdmin/agent-nodejs/commit/f8b83d0ac62f8353bbafdba76ff5a4aae7556015))
* **rules:** allow null and number value for some date operators ([#173](https://github.com/ForestAdmin/agent-nodejs/issues/173)) ([a618896](https://github.com/ForestAdmin/agent-nodejs/commit/a61889603d8adb5193c53f529fa730b8d7d62426))
* **search:** decorator should inject instantiated condition-trees ([#84](https://github.com/ForestAdmin/agent-nodejs/issues/84)) ([9dcc172](https://github.com/ForestAdmin/agent-nodejs/commit/9dcc1726f71ede363cf5785f36f68aa2c2904c25))
* **search:** stop generating invalid condition trees ([#109](https://github.com/ForestAdmin/agent-nodejs/issues/109)) ([9a2bf38](https://github.com/ForestAdmin/agent-nodejs/commit/9a2bf3858b8f9309947f68ce7717c288a8072edc))
* **segment:** add missing export on toolkit ([#83](https://github.com/ForestAdmin/agent-nodejs/issues/83)) ([a6dbe06](https://github.com/ForestAdmin/agent-nodejs/commit/a6dbe06e783b74cc902a3b626e9bf5afe9838728))
* sort-emulation does not work when using pagination ([#171](https://github.com/ForestAdmin/agent-nodejs/issues/171)) ([d263608](https://github.com/ForestAdmin/agent-nodejs/commit/d263608ff8c6b84c55cca2ff2bc10149411472e0))
* tests were not compiled ([#7](https://github.com/ForestAdmin/agent-nodejs/issues/7)) ([9f2525d](https://github.com/ForestAdmin/agent-nodejs/commit/9f2525dfe6753471b13296899038df27ca1f28be))
* **toolkit,interfaces:** set invalidatedDependencies as optional in SuccessReponse ([#10](https://github.com/ForestAdmin/agent-nodejs/issues/10)) ([d6f12bb](https://github.com/ForestAdmin/agent-nodejs/commit/d6f12bb8bbc162fe6381e62795568bdc0bb5d785))
* **unpack:** throw error when the column schema has not the same type of the value ([#134](https://github.com/ForestAdmin/agent-nodejs/issues/134)) ([f6db66c](https://github.com/ForestAdmin/agent-nodejs/commit/f6db66cfc9ca45c638a1b2078bc8fb767b858048))
* **validation:** support Null value ([#130](https://github.com/ForestAdmin/agent-nodejs/issues/130)) ([aa90b85](https://github.com/ForestAdmin/agent-nodejs/commit/aa90b85b36fc64d5ade2010c596cbb245bd8b56f))
* **validator:** support UUID list ([#118](https://github.com/ForestAdmin/agent-nodejs/issues/118)) ([3c4474d](https://github.com/ForestAdmin/agent-nodejs/commit/3c4474d5d707205efeee4beb951e1c4d6405865c))


### Features

* add action routes and decorator ([#149](https://github.com/ForestAdmin/agent-nodejs/issues/149)) ([ebf27ff](https://github.com/ForestAdmin/agent-nodejs/commit/ebf27ffb439f5f2c983fe8873a515fe2802a9a17))
* add chart route ([#120](https://github.com/ForestAdmin/agent-nodejs/issues/120)) ([2310510](https://github.com/ForestAdmin/agent-nodejs/commit/2310510d545672cf18ccbe956a1d5c716b17cff7))
* add jointure decorator ([#158](https://github.com/ForestAdmin/agent-nodejs/issues/158)) ([e8d8e95](https://github.com/ForestAdmin/agent-nodejs/commit/e8d8e95d6d92e9378ca0de5d7efb12a8bd04a21e))
* add new shared utils ([#44](https://github.com/ForestAdmin/agent-nodejs/issues/44)) ([4c67f9e](https://github.com/ForestAdmin/agent-nodejs/commit/4c67f9ea8b72b5f76286ad15f31fb9b41d77b980))
* add record serializer ([#14](https://github.com/ForestAdmin/agent-nodejs/issues/14)) ([5ddeb30](https://github.com/ForestAdmin/agent-nodejs/commit/5ddeb306c8758d5533f406f8134b53ccd3a380b8))
* agent builder ([#146](https://github.com/ForestAdmin/agent-nodejs/issues/146)) ([678a8f7](https://github.com/ForestAdmin/agent-nodejs/commit/678a8f7b9b3204c811a5c1f2ee46287efdc84dd6))
* **agent:** handle leaderboard chart ([#142](https://github.com/ForestAdmin/agent-nodejs/issues/142)) ([e20744b](https://github.com/ForestAdmin/agent-nodejs/commit/e20744b22d00252636f04cfe70d9eb523b190b57))
* bootstrap agent package ([#12](https://github.com/ForestAdmin/agent-nodejs/issues/12)) ([182c858](https://github.com/ForestAdmin/agent-nodejs/commit/182c858b6d912dba37fe821cc6baaad75b80c59d))
* **collections:** add list and count routes ([#42](https://github.com/ForestAdmin/agent-nodejs/issues/42)) ([5584f08](https://github.com/ForestAdmin/agent-nodejs/commit/5584f08e16d84447ba6fdeb960c9776d49424c55))
* **computed:** implement readonly computed fields ([#73](https://github.com/ForestAdmin/agent-nodejs/issues/73)) ([ad68a5a](https://github.com/ForestAdmin/agent-nodejs/commit/ad68a5afe768ed00ae558617090a1a2c2508408e))
* **condition-tree:** implement user filters and better emulation ([#76](https://github.com/ForestAdmin/agent-nodejs/issues/76)) ([e425704](https://github.com/ForestAdmin/agent-nodejs/commit/e4257046853b2b165f4190daa0d953d7f79ed837))
* **decorators:** add search decorator ([#37](https://github.com/ForestAdmin/agent-nodejs/issues/37)) ([eaed2b3](https://github.com/ForestAdmin/agent-nodejs/commit/eaed2b34f1a603a45f4b946cb6a679f3f693db99))
* **decorator:** write emulate ([#157](https://github.com/ForestAdmin/agent-nodejs/issues/157)) ([6c7f5f6](https://github.com/ForestAdmin/agent-nodejs/commit/6c7f5f6daed7e9f51b3068ebca5ac49a9a6e01d8))
* **example,live:** update example package to use Live DataSource ([#69](https://github.com/ForestAdmin/agent-nodejs/issues/69)) ([340d2a0](https://github.com/ForestAdmin/agent-nodejs/commit/340d2a08ea945169dd8c7547a5995bb7dd531fc5))
* handle sort parameters in list and count routes ([#58](https://github.com/ForestAdmin/agent-nodejs/issues/58)) ([c17744b](https://github.com/ForestAdmin/agent-nodejs/commit/c17744b52f98262014f025e26119167123684d3d))
* implement base interfaces ([#2](https://github.com/ForestAdmin/agent-nodejs/issues/2)) ([d34fd9c](https://github.com/ForestAdmin/agent-nodejs/commit/d34fd9cfcd87190a50d8637c1d63e7fae3b8e522))
* implement condition tree equivalents ([#71](https://github.com/ForestAdmin/agent-nodejs/issues/71)) ([d434eb2](https://github.com/ForestAdmin/agent-nodejs/commit/d434eb294b159f91747e4d78e737f5bd32ffb147))
* implement data-source decorator ([#49](https://github.com/ForestAdmin/agent-nodejs/issues/49)) ([1651607](https://github.com/ForestAdmin/agent-nodejs/commit/1651607bbc55176dd02c6e89603c41af87b26269))
* implement filters, sort, pagination and relations in dummy datasource ([#80](https://github.com/ForestAdmin/agent-nodejs/issues/80)) ([4229358](https://github.com/ForestAdmin/agent-nodejs/commit/4229358b6f2aff9c5ab0638d4b61efca7f2ecdd3))
* implement relations using any unique key ([#159](https://github.com/ForestAdmin/agent-nodejs/issues/159)) ([b6be495](https://github.com/ForestAdmin/agent-nodejs/commit/b6be495d93ae03a67c6dc9b4ffbb0ae9f4cbc0bc))
* implement schema conversion ([#16](https://github.com/ForestAdmin/agent-nodejs/issues/16)) ([d641263](https://github.com/ForestAdmin/agent-nodejs/commit/d6412636950370a4189a746888dca0b02247df3a))
* implement scopes ([#114](https://github.com/ForestAdmin/agent-nodejs/issues/114)) ([39f7748](https://github.com/ForestAdmin/agent-nodejs/commit/39f77485c436b9c083984a73aa3330b698f33380))
* operators decorator ([#43](https://github.com/ForestAdmin/agent-nodejs/issues/43)) ([b22594b](https://github.com/ForestAdmin/agent-nodejs/commit/b22594bd1f7d749229d3a4c33cd7cdef1a79c278))
* prepare datasource toolkit for live datasource ([#62](https://github.com/ForestAdmin/agent-nodejs/issues/62)) ([07a62a2](https://github.com/ForestAdmin/agent-nodejs/commit/07a62a206876c1c28647b366fd896c0fedd163e2))
* publication decorator ([#50](https://github.com/ForestAdmin/agent-nodejs/issues/50)) ([a3ab037](https://github.com/ForestAdmin/agent-nodejs/commit/a3ab0370ae2b68c2230b4fdf9625e821839b6df0))
* remove toolkit from customer code ([#229](https://github.com/ForestAdmin/agent-nodejs/issues/229)) ([1421c6d](https://github.com/ForestAdmin/agent-nodejs/commit/1421c6d8798ff92aada3fbfdfa2c95ee2429714b))
* rename decorator ([#47](https://github.com/ForestAdmin/agent-nodejs/issues/47)) ([e41ff2a](https://github.com/ForestAdmin/agent-nodejs/commit/e41ff2a20ae86e56b0337c91549f1c27b9eed833))
* **route:** add count-related route ([#87](https://github.com/ForestAdmin/agent-nodejs/issues/87)) ([4dfedea](https://github.com/ForestAdmin/agent-nodejs/commit/4dfedeadf8e19fb10466d42bb6d270a3745717d5))
* **route:** add create route ([#56](https://github.com/ForestAdmin/agent-nodejs/issues/56)) ([23c6639](https://github.com/ForestAdmin/agent-nodejs/commit/23c66397016c61f8487ac17d95d3eaf2c235afa4))
* **route:** add csv list and related routes ([#152](https://github.com/ForestAdmin/agent-nodejs/issues/152)) ([7c30a3c](https://github.com/ForestAdmin/agent-nodejs/commit/7c30a3c534d25184a6f897aab51434d0b93bbccb))
* **route:** add delete and dissociate routes ([#138](https://github.com/ForestAdmin/agent-nodejs/issues/138)) ([f228aac](https://github.com/ForestAdmin/agent-nodejs/commit/f228aaca0db144abd1d4fc952b8f215b96e29b3b))
* **route:** add list-related route ([#116](https://github.com/ForestAdmin/agent-nodejs/issues/116)) ([758abcd](https://github.com/ForestAdmin/agent-nodejs/commit/758abcdb7c6446b007c641e0f0f908d747162115))
* **route:** implement all the delete routes ([#59](https://github.com/ForestAdmin/agent-nodejs/issues/59)) ([0a46f10](https://github.com/ForestAdmin/agent-nodejs/commit/0a46f10badc3e5c33b85242377afb7f54bdf8365))
* **route:** register the update related route ([#145](https://github.com/ForestAdmin/agent-nodejs/issues/145)) ([95ed908](https://github.com/ForestAdmin/agent-nodejs/commit/95ed908c47cf852cf891bd62eee5d72692e19005))
* **segment:** add segment decorator  ([#55](https://github.com/ForestAdmin/agent-nodejs/issues/55)) ([07dbdd9](https://github.com/ForestAdmin/agent-nodejs/commit/07dbdd970262dedc35a0f5a29ec7994425c87469))
* sort emulation on list ([#74](https://github.com/ForestAdmin/agent-nodejs/issues/74)) ([0865c5f](https://github.com/ForestAdmin/agent-nodejs/commit/0865c5f197d6956f46bef8fc6f68187281f95e3d))
* **toolkit:** add base class for collections ([#31](https://github.com/ForestAdmin/agent-nodejs/issues/31)) ([333e0e9](https://github.com/ForestAdmin/agent-nodejs/commit/333e0e9d50e0493f7b573c39f14ea7cefe951b01))
* **toolkit:** add base class for dataSources ([#35](https://github.com/ForestAdmin/agent-nodejs/issues/35)) ([b4a20f5](https://github.com/ForestAdmin/agent-nodejs/commit/b4a20f56a3081a2c948a085fc3b533836fc1d862))
* validate the filters ([#45](https://github.com/ForestAdmin/agent-nodejs/issues/45)) ([453323a](https://github.com/ForestAdmin/agent-nodejs/commit/453323a4143a89c4562924d2fb711524dd8ba2f0))
