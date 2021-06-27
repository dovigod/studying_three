var Stats = function () {
	function e(e, t, a) {
		var l, n, s;
		for (n = 0; n < 30; n++)
			for (l = 0; l < 73; l++)
				(s = 4 * (l + 74 * n)), (e[s] = e[s + 4]), (e[s + 1] = e[s + 5]), (e[s + 2] = e[s + 6]);
		for (n = 0; n < 30; n++)
			(s = 4 * (73 + 74 * n)),
				n < t
					? ((e[s] = T[a].bg.r), (e[s + 1] = T[a].bg.g), (e[s + 2] = T[a].bg.b))
					: ((e[s] = T[a].fg.r), (e[s + 1] = T[a].fg.g), (e[s + 2] = T[a].fg.b));
	}
	function t() {
		switch (
			(x++,
			x == M ? (x = 0) : x,
			(l.style.display = 'none'),
			(o.style.display = 'none'),
			(f.style.display = 'none'),
			x)
		) {
			case 0:
				l.style.display = 'block';
				break;
			case 1:
				o.style.display = 'block';
				break;
			case 2:
				f.style.display = 'block';
		}
	}
	var a,
		l,
		n,
		s,
		i,
		g,
		o,
		r,
		p,
		d,
		m,
		f,
		b,
		h,
		y,
		c,
		x = 0,
		M = 2,
		u = 0,
		w = Date.now(),
		v = w,
		C = w,
		S = 0,
		k = 1e3,
		E = 0,
		H = 0,
		L = 1e3,
		D = 0,
		I = 0,
		z = 1e3,
		A = 0,
		T = {
			fps: { bg: { r: 16, g: 16, b: 48 }, fg: { r: 0, g: 255, b: 255 } },
			ms: { bg: { r: 16, g: 48, b: 16 }, fg: { r: 0, g: 255, b: 0 } },
			mb: { bg: { r: 48, g: 16, b: 26 }, fg: { r: 255, g: 0, b: 128 } }
		};
	(a = document.createElement('div')),
		(a.style.cursor = 'pointer'),
		(a.style.width = '80px'),
		(a.style.opacity = '0.9'),
		(a.style.zIndex = '10001'),
		a.addEventListener('click', t, !1),
		(l = document.createElement('div')),
		(l.style.backgroundColor =
			'rgb(' +
			Math.floor(T.fps.bg.r / 2) +
			',' +
			Math.floor(T.fps.bg.g / 2) +
			',' +
			Math.floor(T.fps.bg.b / 2) +
			')'),
		(l.style.padding = '2px 0px 3px 0px'),
		a.appendChild(l),
		(n = document.createElement('div')),
		(n.style.fontFamily = 'Helvetica, Arial, sans-serif'),
		(n.style.textAlign = 'left'),
		(n.style.fontSize = '9px'),
		(n.style.color = 'rgb(' + T.fps.fg.r + ',' + T.fps.fg.g + ',' + T.fps.fg.b + ')'),
		(n.style.margin = '0px 0px 1px 3px'),
		(n.innerHTML = '<span style="font-weight:bold">FPS</span>'),
		l.appendChild(n),
		(s = document.createElement('canvas')),
		(s.width = 74),
		(s.height = 30),
		(s.style.display = 'block'),
		(s.style.marginLeft = '3px'),
		l.appendChild(s),
		(i = s.getContext('2d')),
		(i.fillStyle = 'rgb(' + T.fps.bg.r + ',' + T.fps.bg.g + ',' + T.fps.bg.b + ')'),
		i.fillRect(0, 0, s.width, s.height),
		(g = i.getImageData(0, 0, s.width, s.height)),
		(o = document.createElement('div')),
		(o.style.backgroundColor =
			'rgb(' +
			Math.floor(T.ms.bg.r / 2) +
			',' +
			Math.floor(T.ms.bg.g / 2) +
			',' +
			Math.floor(T.ms.bg.b / 2) +
			')'),
		(o.style.padding = '2px 0px 3px 0px'),
		(o.style.display = 'none'),
		a.appendChild(o),
		(r = document.createElement('div')),
		(r.style.fontFamily = 'Helvetica, Arial, sans-serif'),
		(r.style.textAlign = 'left'),
		(r.style.fontSize = '9px'),
		(r.style.color = 'rgb(' + T.ms.fg.r + ',' + T.ms.fg.g + ',' + T.ms.fg.b + ')'),
		(r.style.margin = '0px 0px 1px 3px'),
		(r.innerHTML = '<span style="font-weight:bold">MS</span>'),
		o.appendChild(r),
		(p = document.createElement('canvas')),
		(p.width = 74),
		(p.height = 30),
		(p.style.display = 'block'),
		(p.style.marginLeft = '3px'),
		o.appendChild(p),
		(d = p.getContext('2d')),
		(d.fillStyle = 'rgb(' + T.ms.bg.r + ',' + T.ms.bg.g + ',' + T.ms.bg.b + ')'),
		d.fillRect(0, 0, p.width, p.height),
		(m = d.getImageData(0, 0, p.width, p.height));
	try {
		performance && performance.memory && performance.memory.totalJSHeapSize && (M = 3);
	} catch (e) {}
	return (
		(f = document.createElement('div')),
		(f.style.backgroundColor =
			'rgb(' +
			Math.floor(T.mb.bg.r / 2) +
			',' +
			Math.floor(T.mb.bg.g / 2) +
			',' +
			Math.floor(T.mb.bg.b / 2) +
			')'),
		(f.style.padding = '2px 0px 3px 0px'),
		(f.style.display = 'none'),
		a.appendChild(f),
		(b = document.createElement('div')),
		(b.style.fontFamily = 'Helvetica, Arial, sans-serif'),
		(b.style.textAlign = 'left'),
		(b.style.fontSize = '9px'),
		(b.style.color = 'rgb(' + T.mb.fg.r + ',' + T.mb.fg.g + ',' + T.mb.fg.b + ')'),
		(b.style.margin = '0px 0px 1px 3px'),
		(b.innerHTML = '<span style="font-weight:bold">MB</span>'),
		f.appendChild(b),
		(h = document.createElement('canvas')),
		(h.width = 74),
		(h.height = 30),
		(h.style.display = 'block'),
		(h.style.marginLeft = '3px'),
		f.appendChild(h),
		(y = h.getContext('2d')),
		(y.fillStyle = '#301010'),
		y.fillRect(0, 0, h.width, h.height),
		(c = y.getImageData(0, 0, h.width, h.height)),
		{
			domElement: a,
			update: function () {
				u++,
					(w = Date.now()),
					(H = w - v),
					(L = Math.min(L, H)),
					(D = Math.max(D, H)),
					e(m.data, Math.min(30, 30 - (H / 200) * 30), 'ms'),
					(r.innerHTML = '<span style="font-weight:bold">' + H + ' MS</span> (' + L + '-' + D + ')'),
					d.putImageData(m, 0, 0),
					(v = w),
					w > C + 1e3 &&
						((S = Math.round((1e3 * u) / (w - C))),
						(k = Math.min(k, S)),
						(E = Math.max(E, S)),
						e(g.data, Math.min(30, 30 - (S / 100) * 30), 'fps'),
						(n.innerHTML = '<span style="font-weight:bold">' + S + ' FPS</span> (' + k + '-' + E + ')'),
						i.putImageData(g, 0, 0),
						3 == M &&
							((I = 9.54e-7 * performance.memory.usedJSHeapSize),
							(z = Math.min(z, I)),
							(A = Math.max(A, I)),
							e(c.data, Math.min(30, 30 - I / 2), 'mb'),
							(b.innerHTML =
								'<span style="font-weight:bold">' +
								Math.round(I) +
								' MB</span> (' +
								Math.round(z) +
								'-' +
								Math.round(A) +
								')'),
							y.putImageData(c, 0, 0)),
						(C = w),
						(u = 0));
			}
		}
	);
};
