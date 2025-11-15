// Aguarda o HTML carregar
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DAS ABAS (TABS) E MENU POPUP (NOVO) ---
    const subNav = document.getElementById('sub-nav-jogador');
    const contentSections = document.querySelectorAll('.content-section');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (subNav) {
        subNav.addEventListener('click', (e) => {
            // Só ativa se clicar num botão de aba
            if (!e.target.classList.contains('sub-nav-btn')) return;

            const targetId = e.target.dataset.target;
            
            // Atualiza botões
            subNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Atualiza conteúdo
            contentSections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });
            
            // (NOVO) Fecha o menu popup após clicar numa aba
            if (window.innerWidth <= 768) {
                subNav.classList.remove('open');
            }
        });
    }

    // (NOVO) Lógica do Menu Hambúrguer
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            subNav.classList.add('open');
        });
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            subNav.classList.remove('open');
        });
    }

    // --- 2. BANCO DE DADOS DO SISTEMA (EDIÇÃO 1 - 40 PC + 3 Grátis) ---
    // (Este banco de dados está completo com as 5 Matrizes Nv 0/1)
    const DADOS_SISTEMA = {
        matrizes: {
            tecnologo: {
                nome: "O Tecnólogo",
                desc: "Seus poderes vêm do que você constrói: trajes, implantes ou dispositivos.",
                atributoPrimario: "Inteligência",
                habilidadesIniciais: ["Proficiência TR: Inteligência, Constituição.", "Perícias: Escolha 3 (Investigação, Tecnologia, Percepção, Intuição, Furtividade).", "Núcleo de Poder: Seus poderes estão ligados a um item que pode ser desativado."],
                poderes: [
                    // --- Nível 0 (À Vontade / Passivo) - Custo 0 PC ---
                    {
                        id: 'tec_vontade_rajada', nome: 'Rajada Simples', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: '18 metros', duracao: 'Instantâneo',
                        desc: ["Você dispara um raio de energia de baixa potência.", "Faça um ataque à distância (com INT). Se acertar, causa 1d8 de dano de energia."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'tec_passivo_interface', nome: 'Interface de Gadgets', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Você tem uma conexão inata com tecnologia.", "Você ganha Proficiência na perícia de Tecnologia. Se já for proficiente, ganha Vantagem em todos os testes de Tecnologia."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'tec_vontade_arpel', nome: 'Arpéu Mecânico', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação Bónus', alcance: '9 metros', duracao: 'Instantâneo',
                        desc: ["Você dispara um gancho com um cabo retrátil.", "Você move-se até 9 metros em linha reta para um ponto que possa ver, sem provocar Ataques de Oportunidade."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'tec_passivo_armadura', nome: 'Armadura Leve', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Seu traje ou implantes fornecem uma camada base de proteção.", "Você ganha um bónus de +1 na sua Defesa (Fortitude) e +1 na sua Defesa (baseada em DES)."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'tec_vontade_scan', nome: 'Scan Tático', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação Bónus', alcance: '18 metros', duracao: 'Instantâneo',
                        desc: ["Seu visor analisa um alvo.", "O Mestre informa-lhe uma Vulnerabilidade (Ex: 'Fogo') ou uma Resistência (Ex: 'Concussão') que o alvo possua."],
                        upcast: "Nenhum."
                    },
                    // --- Nível 1 (Esforço) - Custo em PC ---
                    {
                        id: 'tec_esforco_rajada_N1', nome: 'Rajada Destrutiva', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '24 metros', duracao: 'Instantâneo',
                        desc: ["Você sobrecarrega seus reatores.", "Faça um ataque à distância (com INT). Se acertar, causa 3d10 de dano de energia e o alvo deve fazer um TR de Força (CD 15) ou é empurrado 3 metros."],
                        upcast: "O dano aumenta em +1d10 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'tec_esforco_escudo_N1', nome: 'Escudo de Energia', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Reação (quando é alvo de um ataque)', alcance: 'Pessoal', duracao: '1 rodada',
                        desc: ["Como reação quando um ataque o acerta, você projeta um campo de força.", "Você ganha +5 em todas as as suas Três Defesas até o início do seu próximo turno."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'tec_esforco_misseis_N1', nome: 'Mísseis Teleguiados', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '36 metros', duracao: 'Instantâneo',
                        desc: ["Você dispara 3 micro-mísseis.", "Escolha até 3 alvos. Cada míssil acerta automaticamente e causa 1d4+1 de dano de força."],
                        upcast: "Você dispara +1 míssil adicional por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'tec_esforco_sobrecarga_N1', nome: 'Sobrecarga de Arma', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: 'Concentração (1 minuto)',
                        desc: ["Você desvia energia extra para os seus sistemas.", "Durante 1 minuto, todos os seus ataques (incluindo `Rajada Simples`) causam +1d4 de dano extra."],
                        upcast: "Se usar um Espaço de Nv. 2, o dano extra torna-se +1d8."
                    },
                    {
                        id: 'tec_esforco_rede_N1', nome: 'Rede de Contenção', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Ação', alcance: '9 metros', duracao: 'Instantâneo',
                        desc: ["Você dispara uma rede de polímero.", "Faça um ataque à distância (com INT). Se acertar, o alvo fica 'Preso' (velocidade 0) até se libertar (Ação, TR de Força CD 15)."],
                        upcast: "A CD para se libertar aumenta em +2 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'tec_esforco_pulso_N1', nome: 'Pulso Eletromagnético (PEM)', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Pessoal (cubo de 4.5m)', duracao: 'Instantâneo',
                        desc: ["Você liberta um pulso disruptivo.", "Qualquer dispositivo tecnológico (robôs, outros Tecnólogos) na área deve fazer um TR de Constituição (CD 15). Se falhar, fica Atordoado por 1 rodada."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'tec_esforco_invis_N1', nome: 'Modo Furtivo', tipo: 'Esforço', nivel: 1, custo_pc: 12,
                        ativacao: '1 Ação', alcance: 'Pessoal', duracao: 'Concentração (10 minutos)',
                        desc: ["Seu traje dobra a luz.", "Você fica Invisível. A invisibilidade termina se você atacar, usar um poder de Esforço ou perder a concentração."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'tec_esforco_reparar_N1', nome: 'Nanorreparação', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Toque', duracao: 'Instantâneo',
                        desc: ["Você injeta nanobots.", "O alvo (que não pode ser um construto) sobe 1 Nível na Trilha de Condição (Ex: de 'Machucado' para 'Ferido')."],
                        upcast: "O alvo sobe +1 Nível adicional na Trilha por cada Nível de Espaço acima do 1º."
                    },
                ]
            },
            mutante: {
                nome: "O Mutante",
                desc: "Seus poderes são biológicos, parte do seu DNA. Você nasceu com eles.",
                atributoPrimario: "Constituição",
                habilidadesIniciais: ["Proficiência TR: Constituição, Força (ou Destreza).", "Perícias: Escolha 3 (Atletismo, Acrobacia, Intimidação, Percepção, Sobrevivência).", "Manifestação Inerente: Seu poder é biológico."],
                poderes: [
                    // --- Nível 0 (À Vontade / Passivo) - Custo 0 PC ---
                    {
                        id: 'mut_garr', nome: 'Garras', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: 'Corpo a corpo', duracao: 'Instantâneo',
                        desc: ["Suas mãos são armas.", "Faça um ataque corpo a corpo (pode usar FOR ou DES). Causa 1d10 de dano cortante."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mut_pele', nome: 'Pele Blindada', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Sua pele é densa como rocha.", "Você ganha +2 na sua Defesa (Fortitude)."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mut_instinto', nome: 'Instinto Primitivo', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Seus sentidos são aguçados.", "Você tem Vantagem em testes de Sabedoria (Percepção) relacionados com audição ou olfato."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mut_salto', nome: 'Salto Aprimorado', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: 'Instantâneo',
                        desc: ["Você prepara os seus músculos.", "O seu deslocamento de salto (horizontal e vertical) é triplicado até o final do seu turno."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mut_soco', nome: 'Soco Esmagador', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: 'Corpo a corpo', duracao: 'Instantâneo',
                        desc: ["Um soco com força bruta.", "Faça um ataque corpo a corpo (FOR). Causa 1d8 de dano de concussão."],
                        upcast: "Nenhum."
                    },
                    // --- Nível 1 (Esforço) - Custo em PC ---
                    {
                        id: 'mut_esforco_cura_N1', nome: 'Fator de Cura Acelerado', tipo: 'Esforço', nivel: 1, custo_pc: 15,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: '1 minuto',
                        desc: ["Você força sua biologia a regenerar-se.", "No início de cada um dos seus turnos, durante 1 minuto, você sobe 1 Nível na Trilha de Condição."],
                        upcast: "Se usar um Espaço de Nv. 2 ou 3, sobe 2 Níveis da Trilha por turno."
                    },
                    {
                        id: 'mut_esforco_forca_N1', nome: 'Força Titânica', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Corpo a corpo', duracao: 'Instantâneo',
                        desc: ["Você desfere um soco devastador.", "Faça um ataque corpo a corpo (FOR). Se acertar, causa 3d12 de dano de concussão e o alvo deve fazer um TR de Força (CD 15) ou fica Atordoado por 1 rodada."],
                        upcast: "O dano aumenta em +1d12 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mut_esforco_adapt_N1', nome: 'Adaptação Reativa', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Reação (quando sofre dano de energia, fogo, etc.)', alcance: 'Pessoal', duracao: '1 minuto',
                        desc: ["Quando sofre um tipo de dano (que não seja físico), a sua biologia reage.", "Você ganha Resistência (meio dano) a esse tipo de dano durante 1 minuto."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mut_esforco_invest_N1', nome: 'Investida Imparável', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '9 metros', duracao: 'Instantâneo',
                        desc: ["Você move-se até 9m em linha reta e faz um ataque corpo a corpo.", "Se acertar, o ataque causa +2d10 de dano adicional, e o alvo deve fazer um TR de Força (CD 15) ou fica Caído (Derrubado)."],
                        upcast: "O dano adicional aumenta em +1d10 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mut_esforco_rugido_N1', nome: 'Rugido Sónico', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Cone de 4.5m', duracao: 'Instantâneo',
                        desc: ["Você solta um grito devastador.", "Todos na área devem fazer um TR de Constituição (CD 15). Se falharem, sofrem 3d6 de dano sónico e ficam Surdos por 1 minuto. Se passarem, sofrem metade."],
                        upcast: "O dano aumenta em +1d6 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mut_esforco_sentidos_N1', nome: 'Sentidos de Caçador', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: '1 hora',
                        desc: ["Você aguça os seus instintos.", "Você ganha Vantagem em testes de Sabedoria (Percepção) e (Sobrevivência) para rastrear. Além disso, você pode sentir a localização de criaturas invisíveis a 9m de si."],
                        upcast: "Se usar um Espaço de Nv. 3, a duração torna-se 8 horas."
                    },
                    {
                        id: 'mut_esforco_espinhos_N1', nome: 'Espinhos Retráteis', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Reação (quando é agarrado ou atingido corpo a corpo)', alcance: 'Pessoal', duracao: 'Instantâneo',
                        desc: ["Como reação quando uma criatura o agarra ou atinge, você expele espinhos.", "O atacante sofre 2d10 de dano perfurante e, se o estava a agarrar, deve largá-lo."],
                        upcast: "O dano aumenta em +1d10 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mut_esforco_vantagem_N1', nome: 'Mutação Instável: Vantagem', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: 'Instantâneo',
                        desc: ["Você força a sua biologia a adaptar-se.", "Você ganha Vantagem na sua próxima rolagem de Ataque, Teste de Habilidade ou Teste de Resistência antes do final do seu próximo turno."],
                        upcast: "Nenhum."
                    },
                ]
            },
            mistico: {
                nome: "O Místico",
                desc: "Seus poderes vêm de magia, deuses, ou entidades cósmicas.",
                atributoPrimario: "Sabedoria ou Carisma",
                habilidadesIniciais: ["Proficiência TR: Sabedoria, Carisma.", "Perícias: Escolha 3 (Arcanismo, Religião, História, Intuição, Persuasão).", "Sentido Arcano: Pode sentir a presença de magia ou poderes (Ação)."],
                poderes: [
                    // --- Nível 0 (À Vontade / Passivo) - Custo 0 PC ---
                    {
                        id: 'mis_vontade_raio', nome: 'Raio Místico', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: '24 metros', duracao: 'Instantâneo',
                        desc: ["Um raio de energia é disparado.", "Faça um ataque à distância (com SAB ou CAR). Se acertar, causa 1d10 de dano (energia, fogo, etc.)."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mis_vontade_luz', nome: 'Luz / Taumaturgia', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: '9 metros', duracao: 'Variável',
                        desc: ["Você cria um efeito místico menor e sensorial (uma luz, um som, um odor). Não pode causar dano."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mis_passivo_sentido', nome: 'Sentido Arcano', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Você sente passivamente a presença de magia forte ou perturbações dimensionais a 9m de si."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mis_passivo_mente', nome: 'Mente Blindada', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["A sua mente é um labirinto.", "Você ganha +1 na sua Defesa (Vontade)."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mis_vontade_ferramenta', nome: 'Ferramenta Mágica', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: '10 minutos',
                        desc: ["Você conjura uma ferramenta simples (uma alavanca, uma chave) feita de energia mística. Não pode ser usada como arma."],
                        upcast: "Nenhum."
                    },
                    // --- Nível 1 (Esforço) - Custo em PC ---
                    {
                        id: 'mis_esforco_escudo_N1', nome: 'Escudo Arcano', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Reação (quando é alvo de um ataque)', alcance: 'Pessoal', duracao: '1 rodada',
                        desc: ["Como reação quando um ataque o acerta, você conjura um escudo de energia.", "Você ganha +5 em todas as as suas Três Defesas até o início do seu próximo turno."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mis_esforco_dardos_N1', nome: 'Dardos Mágicos', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '36 metros', duracao: 'Instantâneo',
                        desc: ["Você dispara 3 dardos de energia mística.", "Eles acertam automaticamente alvos e causam 1d4+1 de dano de força cada."],
                        upcast: "Você dispara +1 dardo adicional por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mis_esforco_comando_N1', nome: 'Comando Mental', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '18 metros', duracao: '1 rodada',
                        desc: ["Você impõe a sua vontade a um alvo.", "O alvo deve fazer um TR de Vontade (CD 8 + Prof + Mod. SAB/CAR). Se falhar, ele deve seguir um comando seu de uma palavra (Ex: 'Larga!', 'Foge!') no seu próximo turno."],
                        upcast: "Se usar um Espaço de Nv. 2 ou superior, você pode afetar +1 alvo adicional por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mis_esforco_cura_N1', nome: 'Cura Mística', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Toque', duracao: 'Instantâneo',
                        desc: ["Você canaliza energia positiva.", "O alvo sobe 1 Nível na Trilha de Condição."],
                        upcast: "O alvo sobe +1 Nível adicional na Trilha por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mis_esforco_correntes_N1', nome: 'Correntes Etéreas', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Ação', alcance: '18 metros', duracao: '1 minuto',
                        desc: ["Você lança correntes de energia num alvo.", "Faça um ataque à distância (com SAB ou CAR). Se acertar, o alvo sofre 2d8 de dano de energia e fica 'Preso' (velocidade 0) por 1 minuto. O alvo pode usar a sua Ação para fazer um TR de Força para se libertar."],
                        upcast: "O dano inicial aumenta em +1d8 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'mis_esforco_selo_N1', nome: 'Selo de Proteção', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '9 metros', duracao: 'Até ser descarregado',
                        desc: ["Você traça um selo arcano num aliado.", "Da próxima vez que o alvo sofrer dano, o selo absorve o impacto. O alvo ganha Vantagem no Teste de Resistência de Dano e tem Resistência a esse dano. O selo então desaparece."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mis_esforco_visao_N1', nome: 'Visão Mística', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Ação', alcance: 'Pessoal', duracao: '10 minutos',
                        desc: ["Seus olhos brilham com poder.", "Durante 10 minutos, você pode ver no escuro (18m) e ver coisas invisíveis."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'mis_esforco_sono_N1', nome: 'Sono', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '18m (raio de 6m)', duracao: '1 minuto',
                        desc: ["Você liberta uma onda de energia soporífera.", "Role 5d8. Você afeta criaturas com base no total rolado, começando pela que tiver o Nível de Trilha de Condição mais baixo. As criaturas afetadas caem Incapacitadas (adormecidas) por 1 minuto."],
                        upcast: "Role +2d8 por cada Nível de Espaço acima do 1º."
                    },
                ]
            },
            aprimorado: {
                nome: "O Aprimorado (Acidente)",
                desc: "Você era normal, até que um acidente lhe deu poderes incríveis.",
                atributoPrimario: "Destreza ou Sabedoria",
                habilidadesIniciais: ["Proficiência TR: Destreza, Sabedoria.", "Perícias: Escolha 3 (Acrobacia, Atletismo, Percepção, Intuição, Furtividade).", "Sorte de Principiante: Uma vez por Descanso Longo, pode rolar novamente 1 falha."],
                poderes: [
                    // --- Nível 0 (À Vontade / Passivo) - Custo 0 PC ---
                    {
                        id: 'apr_vontade_impacto', nome: 'Impacto Acrobático', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: 'Corpo a corpo', duracao: 'Instantâneo',
                        desc: ["Um ataque corpo a corpo ágil.", "Faça um ataque corpo a corpo (pode usar FOR ou DES). Causa 1d8 de dano de concussão."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'apr_passivo_andar', nome: 'Andar em Paredes', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Você pode aderir a qualquer superfície.", "Você ganha um deslocamento de escalada igual ao seu deslocamento terrestre."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'apr_passivo_reflexos', nome: 'Reflexos Rápidos', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Seus reflexos são sobre-humanos.", "Você ganha +2 na sua Defesa (baseada em DES)."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'apr_passivo_sentido', nome: 'Sentido de Perigo', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Você tem um sexto sentido que o alerta.", "Você não pode ser Surpreendido e ganha +2 na sua Iniciativa."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'apr_vontade_desviar', nome: 'Desviar Projéteis', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Reação (quando atingido por ataque à distância)', alcance: 'Pessoal', duracao: 'Instantâneo',
                        desc: ["Você tenta aparar ou desviar de um projétil.", "Como reação, role 1d10 + mod. DES. Você reduz o dano do ataque por esse total."],
                        upcast: "Nenhum."
                    },
                    // --- Nível 1 (Esforço) - Custo em PC ---
                    {
                        id: 'apr_esforco_esquiva_N1', nome: 'Esquiva Sobrenatural', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Reação (quando é alvo de um ataque)', alcance: 'Pessoal', duracao: '1 rodada',
                        desc: ["Como reação quando um ataque o acerta, você se move.", "Você ganha +5 na sua Defesa (baseada em DES) até o início do seu próximo turno."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'apr_esforco_teia_N1', nome: 'Disparo de Teia / Adesivo', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '9 metros', duracao: 'Instantâneo',
                        desc: ["Você dispara uma substância adesiva.", "Faça um ataque à distância (com DES). Se acertar, o alvo fica 'Preso' (velocidade 0) até se libertar (Ação, TR de Força CD 15)."],
                        upcast: "A CD para se libertar aumenta em +2 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'apr_esforco_balancar_N1', nome: 'Balançar (Teia/Arpéu)', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: 'Concentração (10 minutos)',
                        desc: ["Você projeta uma linha de teia ou cabo.", "Você ganha um deslocamento de voo de 18m. Este voo só funciona se houver pontos de ancoragem (prédios, etc.) num raio de 18m."],
                        upcast: "Se usar um Espaço de Nv. 3, a duração torna-se 1 hora."
                    },
                    {
                        id: 'apr_esforco_ataque_N1', nome: 'Ataque Acrobático', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Pessoal', duracao: 'Instantâneo',
                        desc: ["Você move-se e ataca com fluidez.", "Você pode Mover-se até metade da sua velocidade e fazer um ataque corpo a corpo (com `Impacto Acrobático`). Este movimento não provoca Ataques de Oportunidade."],
                        upcast: "Se usar um Espaço de Nv. 2 ou superior, você pode usar o seu movimento total e fazer dois ataques."
                    },
                    {
                        id: 'apr_esforco_ricochete_N1', nome: 'Ricochete', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Ação', alcance: '9 metros', duracao: 'Instantâneo',
                        desc: ["Você arremessa um objeto pequeno.", "Escolha dois alvos a 9m de si. Faça um único ataque à distância (com DES) contra ambos. Se acertar, cada alvo sofre 2d10 de dano de concussão."],
                        upcast: "O dano aumenta em +1d10 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'apr_esforco_pancada_N1', nome: 'Pancada Sensorial', tipo: 'Esforço', nivel: 1, custo_pc: 12,
                        ativacao: '1 Ação', alcance: 'Corpo a corpo', duracao: '1 minuto',
                        desc: ["Você atinge um ponto vital do alvo.", "Faça um ataque corpo a corpo (com DES). Se acertar, causa apenas 1d4 de dano, mas o alvo deve fazer um TR de Constituição (CD 15) ou fica Cego e Surdo por 1 minuto."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'apr_esforco_sorte_N1', nome: 'Sorte Pura', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: '1 minuto',
                        desc: ["Você confia na sua sorte impossível.", "Durante 1 minuto, a primeira vez em cada turno que você rolar abaixo de 10 num d20 (ataque, teste, TR), você pode tratar essa rolagem como um 10."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'apr_esforco_repreensao_N1', nome: 'Repreensão Oportuna', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Reação (quando um inimigo ataca um aliado)', alcance: '1.5 metros', duracao: 'Instantâneo',
                        desc: ["Como reação quando um inimigo perto de si ataca um aliado, você o atrapalha.", "O inimigo tem Desvantagem nessa rolagem de ataque."],
                        upcast: "Nenhum."
                    },
                ]
            },
            alienigena: {
                nome: "O Alienígena (De Outro Mundo)",
                desc: "Sua fisiologia é de outro planeta, dando-lhe poderes sob o sol da Terra.",
                atributoPrimario: "Força ou Constituição",
                habilidadesIniciais: ["Proficiência TR: Força, Constituição.", "Perícias: Escolha 3 (Atletismo, Intimidação, Percepção, Tecnologia, Arcanismo).", "Fisiologia Exótica: Resistência a veneno e não precisa respirar."],
                poderes: [
                    // --- Nível 0 (À Vontade / Passivo) - Custo 0 PC ---
                    {
                        id: 'ali_vontade_soco', nome: 'Soco Super-Sónico', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: 'Corpo a corpo', duracao: 'Instantâneo',
                        desc: ["Você ataca com força alienígena.", "Faça um ataque corpo a corpo (FOR). Causa 1d8 de dano de concussão. Se você se moveu 6m antes do ataque, causa 1d10."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'ali_passivo_fisio', nome: 'Fisiologia Alienígena', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Você não precisa de respirar e tem Resistência a dano de veneno e à condição Envenenado."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'ali_passivo_invul', nome: 'Invulnerabilidade (Menor)', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Sua pele é quase impenetrável.", "Você ganha Resistência (meio dano) contra dano de concussão, cortante e perfurante de ataques não-mágicos e não-tecnológicos (Ex: balas, socos normais)."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'ali_passivo_sentidos', nome: 'Super-Sentidos', tipo: 'Passivo', nivel: 0, custo_pc: 0,
                        ativacao: 'Passivo', alcance: 'Pessoal', duracao: 'Contínuo',
                        desc: ["Você pode ver e ouvir a distâncias incríveis.", "Você tem Vantagem em testes de Percepção (visão/audição)."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'ali_vontade_sopro', nome: 'Sopro Ártico (Menor)', tipo: 'À Vontade', nivel: 0, custo_pc: 0,
                        ativacao: '1 Ação', alcance: 'Cone de 4.5m', duracao: 'Instantâneo',
                        desc: ["Você expele ar congelante.", "Inimigos na área devem fazer um TR de Constituição (CD 13). Se falharem, a sua velocidade é reduzida para metade por 1 rodada."],
                        upcast: "Nenhum."
                    },
                    // --- Nível 1 (Esforço) - Custo em PC ---
                    {
                        id: 'ali_esforco_visao_N1', nome: 'Visão de Calor', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '24 metros', duracao: 'Instantâneo',
                        desc: ["Raios de energia saem dos seus olhos.", "Faça um ataque à distância (com CON). Se acertar, causa 3d10 de dano de fogo."],
                        upcast: "O dano aumenta em +1d10 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'ali_esforco_sopro_N1', nome: 'Sopro de Furacão', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Cone de 9m', duracao: 'Instantâneo',
                        desc: ["Você expele ar com a força de um furacão.", "Todos na área devem fazer um TR de Força (CD 15). Se falharem, são empurrados 6 metros para trás e ficam Caídos (Derrubados)."],
                        upcast: "A distância de empurrão aumenta em +1.5m por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'ali_esforco_voo_N1', nome: 'Voo (Nível 1)', tipo: 'Esforço', nivel: 1, custo_pc: 15,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: 'Concentração (10 minutos)',
                        desc: ["Você desafia a gravidade e voa.", "Você ganha um deslocamento de voo de 18m."],
                        upcast: "Se usar um Espaço de Nv. 3, a duração torna-se 1 hora."
                    },
                    {
                        id: 'ali_esforco_investida_N1', nome: 'Investida Esmagadora', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: '9 metros', duracao: 'Instantâneo',
                        desc: ["Você voa 9m em linha reta e faz um ataque corpo a corpo.", "Se acertar, causa +2d10 de dano adicional. Este ataque causa dano dobrado a objetos e estruturas (paredes, veículos)."],
                        upcast: "O dano adicional aumenta em +1d10 por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'ali_esforco_raiox_N1', nome: 'Visão de Raio-X', tipo: 'Esforço', nivel: 1, custo_pc: 8,
                        ativacao: '1 Ação', alcance: 'Pessoal', duracao: 'Concentração (10 minutos)',
                        desc: ["Você pode ver através de materiais sólidos.", "Você pode ver através de 30cm de pedra, 3cm de metal, ou 1m de madeira. A visão é bloqueada por Chumbo."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'ali_esforco_corpo_N1', nome: 'Corpo de Aço', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Reação (quando sofre dano físico)', alcance: 'Pessoal', duracao: 'Instantâneo',
                        desc: ["Como reação quando sofre dano (concussão, cortante, perfurante), você enrijece o seu corpo.", "Você ganha Resistência (meio dano) contra o dano desse ataque."],
                        upcast: "Nenhum."
                    },
                    {
                        id: 'ali_esforco_absorcao_N1', nome: 'Absorção Solar', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação', alcance: 'Pessoal', duracao: 'Instantâneo',
                        desc: ["Se você estiver sob luz solar direta, você absorve energia.", "Você sobe 1 Nível na Trilha de Condição. (Este poder falha se estiver à noite ou dentro de casa)."],
                        upcast: "Você sobe +1 Nível adicional na Trilha por cada Nível de Espaço acima do 1º."
                    },
                    {
                        id: 'ali_esforco_vigor_N1', nome: 'Vigor Lendário', tipo: 'Esforço', nivel: 1, custo_pc: 10,
                        ativacao: '1 Ação Bónus', alcance: 'Pessoal', duracao: '1 hora',
                        desc: ["Você canaliza a sua resiliência alienígena.", "Você ganha Vantagem em todos os Testes de Resistência de Constituição (incluindo Testes de Resistência de Dano) durante 1 hora."],
                        upcast: "Nenhum."
                    },
                ]
            }
        },
        complicacoes: [
            { id: 'comp_id', nome: 'Identidade Secreta', pc: 5 },
            { id: 'comp_vul', nome: 'Vulnerabilidade (Comum)', pc: 10 },
            { id: 'comp_vul_m', nome: 'Vulnerabilidade (Mágica)', pc: 10 },
            { id: 'comp_cod', nome: 'Código de Honra (Não matar)', pc: 5 },
            { id: 'comp_dep', nome: 'Dependente de Poder (Item)', pc: 10 },
            { id: 'comp_inim', nome: 'Inimigo (Recorrente)', pc: 5 },
        ]
    };
    // --- FIM DO BANCO DE DADOS ---


    // --- 3. LÓGICA DO ASSISTENTE (WIZARD) ---
    const wizardContainer = document.getElementById('wizard-container');
    if (wizardContainer) {
        
        let currentStep = 1;
        const totalSteps = 4;
        let pcBase = 40; // PC Base é 40
        const maxNv0 = 3; // Máximo de 3 Nv. 0 Grátis

        let fichaAtual = {
            matriz: null,
            np: 1,
            poderes: {},
            complicacoes: {}
        };

        const ppTrackerContainer = document.getElementById('pp-tracker-container');
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const stepIndicator = document.getElementById('step-indicator');
        const matrizSelectionContainer = document.getElementById('matriz-selection-container');
        const divPoderesDisponiveis = document.getElementById('poderes-disponiveis');
        const divComplicacoesLista = document.getElementById('complicacoes-lista');
        const divFichaFinal = document.getElementById('ficha-final-resumo');

        function init() {
            ppTrackerContainer.innerHTML = `
                <span class="pp-tracker">
                    Pontos de Criação (PC) Restantes: <span id="pp-total">40</span>
                </span>`;
            
            buildStep1();
            buildStep3();
            
            btnPrev.addEventListener('click', navigatePrev);
            btnNext.addEventListener('click', navigateNext);
            matrizSelectionContainer.addEventListener('click', handleMatrizSelect);
            divPoderesDisponiveis.addEventListener('click', handlePoderClick);
            divComplicacoesLista.addEventListener('change', handleComplicacaoToggle);
            
            showStep(1);
        }

        function buildStep1() {
            matrizSelectionContainer.innerHTML = '';
            for (const [key, matriz] of Object.entries(DADOS_SISTEMA.matrizes)) {
                matrizSelectionContainer.innerHTML += `
                    <div class="matriz-card" data-matriz-key="${key}">
                        <h3>${matriz.nome}</h3>
                        <p>${matriz.desc}</p>
                        <small><strong>Atributo Primário:</strong> ${matriz.atributoPrimario}</small>
                    </div>
                `;
            }
        }

        function buildStep2() {
            if (!fichaAtual.matriz) return;
            const matriz = DADOS_SISTEMA.matrizes[fichaAtual.matriz];
            
            const poderesPorNivel = {};
            let nv0Count = 0;
            
            for (const poder of matriz.poderes) {
                if (poder.nivel <= fichaAtual.np) {
                    if (!poderesPorNivel[poder.nivel]) {
                        poderesPorNivel[poder.nivel] = [];
                    }
                    poderesPorNivel[poder.nivel].push(poder);
                }
            }
            for (const poder of Object.values(fichaAtual.poderes)) {
                if (poder.nivel === 0) nv0Count++;
            }

            divPoderesDisponiveis.innerHTML = '';
            const ordemNiveis = Object.keys(poderesPorNivel).sort((a,b) => a - b);
            
            for (const nivel of ordemNiveis) {
                let nivelLabel = `Poderes de Esforço (Nível ${nivel})`;
                if (nivel == 0) nivelLabel = `Passivos & À Vontade (Escolha ${maxNv0 - nv0Count} restantes)`;
                
                divPoderesDisponiveis.innerHTML += `<h3 class="power-level-header">${nivelLabel}</h3>`;

                for (const poder of poderesPorNivel[nivel]) {
                    const poderNaFicha = fichaAtual.poderes[poder.id];
                    
                    let controlsHTML = '';
                    if (poder.nivel === 0) {
                        if (poderNaFicha) {
                            controlsHTML = `<button class="btn btn-small btn-remove" data-id="${poder.id}">Remover</button>`;
                        } else {
                            controlsHTML = `<button class="btn btn-small btn-add" data-id="${poder.id}" ${nv0Count >= maxNv0 ? 'disabled' : ''}>Escolher (Grátis)</button>`;
                        }
                    } else {
                        if (poderNaFicha) {
                            controlsHTML = `<button class="btn btn-small btn-remove" data-id="${poder.id}">Remover</button>`;
                        } else {
                            controlsHTML = `<button class="btn btn-small btn-add" data-id="${poder.id}">Adicionar (Custo: ${poder.custo_pc} PC)</button>`;
                        }
                    }

                    divPoderesDisponiveis.innerHTML += `
                    <div class="poder-card-wizard ${poderNaFicha ? 'comprado' : ''}">
                        <div class="poder-card-header">
                            <strong>${poder.nome} (${poder.tipo})</strong>
                            <div class="item-poder-controls">
                                ${controlsHTML}
                            </div>
                        </div>
                        <div class="poder-card-stats">
                            <span><strong>Custo (PC):</strong> ${poder.custo_pc == 0 ? 'Grátis (Escolha)' : `${poder.custo_pc} PC`}</span>
                            <span><strong>Nível:</strong> ${poder.nivel} (${poder.tipo})</span>
                            <span><strong>Ativação:</strong> ${poder.ativacao}</span>
                        </div>
                        <div class="poder-card-desc">
                            ${poder.desc.map(p => `<p>${p}</p>`).join('')}
                            <p class="ranks-superiores"><strong>Em Níveis Superiores:</strong> ${poder.upcast}</p>
                        </div>
                    </div>
                    `;
                }
            }
        }
        
        function buildStep3() {
            divComplicacoesLista.innerHTML = '';
            for (const comp of DADOS_SISTEMA.complicacoes) {
                const isChecked = fichaAtual.complicacoes[comp.id] ? 'checked' : '';
                divComplicacoesLista.innerHTML += `
                    <div class="item-complicacao">
                        <label for="${comp.id}">
                            <input type="checkbox" id="${comp.id}" data-pc="${comp.pc}" data-nome="${comp.nome}" data-id="${comp.id}" ${isChecked}>
                            <div>
                                <strong>${comp.nome}</strong>
                                <small>(+${comp.pc} PC)</small>
                            </div>
                        </label>
                    </div>
                `;
            }
        }
        
        function buildStep4() {
            if (!fichaAtual.matriz) return;
            const matriz = DADOS_SISTEMA.matrizes[fichaAtual.matriz];
            
            let poderesNv0HTML = '<ul>';
            let poderesNv1HTML = '<ul>';
            const poderesComprados = Object.values(fichaAtual.poderes).sort((a,b) => a.nivel - b.nivel || a.nome.localeCompare(b.nome));
            let nv0Count = 0;
            
            for (const poder of poderesComprados) {
                if (poder.nivel === 0) {
                    poderesNv0HTML += `<li><strong>${poder.nome}</strong> (${poder.tipo})</li>`;
                    nv0Count++;
                } else {
                    poderesNv1HTML += `<li><strong>${poder.nome}</strong> (Nível ${poder.nivel}) - Custo: ${poder.custo_pc} PC</li>`;
                }
            }
            if (nv0Count === 0) poderesNv0HTML += '<li class="placeholder-text">Nenhum poder Nv. 0 escolhido.</li>';
            if (poderesComprados.length === nv0Count) poderesNv1HTML += '<li class="placeholder-text">Nenhum poder Nv. 1 comprado.</li>';
            poderesNv0HTML += '</ul>';
            poderesNv1HTML += '</ul>';

            let compsHTML = '<ul>';
            if (Object.keys(fichaAtual.complicacoes).length > 0) {
                for (const comp of Object.values(fichaAtual.complicacoes)) {
                    compsHTML += `<li><strong>${comp.nome}</strong> (+${comp.pc} PC)</li>`;
                }
            } else {
                compsHTML += '<li class="placeholder-text">Nenhuma complicação adicionada.</li>';
            }
            compsHTML += '</ul>';
            
            const pcGasto = updatePCTotal(true);
            const pcTotal = pcBase + Object.values(fichaAtual.complicacoes).reduce((acc, c) => acc + c.pc, 0);

            divFichaFinal.innerHTML = `
                <h3>Matriz: ${matriz.nome}</h3>
                <ul class="habilidades-iniciais">
                    ${matriz.habilidadesIniciais.map(h => `<li>${h}</li>`).join('')}
                </ul>
                <h3>Poderes Nível 0 Escolhidos (${nv0Count}/${maxNv0})</h3>
                ${poderesNv0HTML}
                <h3>Poderes de Esforço Aprendidos</h3>
                ${poderesNv1HTML}
                <h3>Complicações</h3>
                ${compsHTML}
                <hr style="margin: 1.5rem 0;">
                <p><strong>RECURSOS DE JOGO (NP 1):</strong></p>
                <p><strong>Pontos de Criação (PC) Gastos:</strong> ${pcGasto} / ${pcTotal} (PC Restantes: ${pcTotal - pcGasto})</p>
                <p><strong>Espaços de Poder (Diários):</strong> 3 Espaços de Nível 1 (Recarregam num Descanso Longo)</p>
            `;
        }

        function showStep(stepNum) {
            wizardContainer.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
            document.getElementById(`step-${stepNum}`).classList.add('active');
            currentStep = stepNum;

            stepIndicator.textContent = `Passo ${currentStep} de ${totalSteps}`;
            btnPrev.disabled = (currentStep === 1);
            btnNext.disabled = (currentStep === 1 && !fichaAtual.matriz) || (currentStep === totalSteps);
            
            if (currentStep === 4) buildStep4();
            if (currentStep === 2) buildStep2();
            if (currentStep === 3) buildStep3();
        }

        function navigatePrev() { if (currentStep > 1) showStep(currentStep - 1); }
        function navigateNext() { if (currentStep < totalSteps) showStep(currentStep + 1); }

        function updatePCTotal(returnOnly = false) {
            let custoPoderes = 0;
            for (const poder of Object.values(fichaAtual.poderes)) {
                if (poder.nivel > 0) {
                    custoPoderes += poder.custo_pc;
                }
            }
            let bonusComplicacoes = 0;
            for (const comp of Object.values(fichaAtual.complicacoes)) {
                bonusComplicacoes += comp.pc;
            }
            
            if (returnOnly) return custoPoderes;

            const pcRestante = pcBase + bonusComplicacoes - custoPoderes;
            const pcTotalSpan = document.getElementById('pp-total');
            if(pcTotalSpan) {
                pcTotalSpan.textContent = pcRestante;
                pcTotalSpan.classList.toggle('negativo', pcRestante < 0);
                ppTrackerContainer.querySelector('.pp-tracker').innerHTML = `Pontos de Criação (PC) Restantes: <span id="pp-total" class="${pcRestante < 0 ? 'negativo' : ''}">${pcRestante}</span>`;
            }
            return pcRestante;
        }
        
        function handleMatrizSelect(e) {
            const card = e.target.closest('.matriz-card');
            if (!card) return;
            const matrizKey = card.dataset.matrizKey;

            if (fichaAtual.matriz === matrizKey) return;
            
            if (fichaAtual.matriz !== null && (Object.keys(fichaAtual.poderes).length > 0 || Object.keys(fichaAtual.complicacoes).length > 0)) {
                if (!confirm("Você tem a certeza? Mudar de Matriz irá limpar os seus poderes e complicações selecionados.")) {
                    return;
                }
            }

            fichaAtual.matriz = matrizKey;
            fichaAtual.poderes = {};
            fichaAtual.complicacoes = {};
            
            matrizSelectionContainer.querySelectorAll('.matriz-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            btnNext.disabled = false;
            
            updatePCTotal();
            buildStep3();
        }

        function handlePoderClick(e) {
            const button = e.target.closest('button.btn-add, button.btn-remove');
            if (!button) return;
            
            const id = button.dataset.id;
            if (!id) return;

            const dadosPoder = DADOS_SISTEMA.matrizes[fichaAtual.matriz].poderes.find(p => p.id === id);
            if (!dadosPoder) return;

            if (button.classList.contains('btn-add')) {
                if (dadosPoder.nivel === 0) {
                    let nv0Count = 0;
                    for (const poder of Object.values(fichaAtual.poderes)) {
                        if (poder.nivel === 0) nv0Count++;
                    }
                    if (nv0Count >= maxNv0) {
                        alert(`Você só pode escolher ${maxNv0} poderes de Nível 0 gratuitos.`);
                        return;
                    }
                } else {
                    const pcRestante = updatePCTotal();
                    if (dadosPoder.custo_pc > pcRestante) {
                        alert("Pontos de Criação (PC) insuficientes para comprar este poder!");
                        return;
                    }
                }
                fichaAtual.poderes[id] = { ...dadosPoder };
            } else if (button.classList.contains('btn-remove')) {
                delete fichaAtual.poderes[id];
            }
            
            buildStep2();
            updatePCTotal();
        }
        
        function handleComplicacaoToggle(e) {
            const checkbox = e.target;
            if (checkbox.type !== 'checkbox') return;
            const id = checkbox.dataset.id;
            const nome = checkbox.dataset.nome;
            const pc = parseInt(checkbox.dataset.pc);

            if (!checkbox.checked) {
                const pcRestante = updatePCTotal();
                if (pcRestante < pc) {
                    alert("Você não pode remover esta complicação, pois já gastou os PC que ela fornece.");
                    checkbox.checked = true;
                    return;
                }
            }

            if (checkbox.checked) {
                fichaAtual.complicacoes[id] = { id, nome, pc };
            } else {
                delete fichaAtual.complicacoes[id];
            }
            updatePCTotal();
        }

        init();
    } // Fim do 'if (wizardContainer)'


    // --- 4. LÓGICA DO CAPÍTULO 3 (REFERÊNCIA) ---
    
    function buildReferencePage() {
        const refContainer = document.getElementById('matrizes-referencia-completa');
        if (!refContainer) return;

        refContainer.innerHTML = '';

        for (const [key, matriz] of Object.entries(DADOS_SISTEMA.matrizes)) {
            
            const poderesPorNivel = {};
            for (const poder of matriz.poderes) {
                if (!poderesPorNivel[poder.nivel]) {
                    poderesPorNivel[poder.nivel] = [];
                }
                poderesPorNivel[poder.nivel].push(poder);
            }
            
            let poderesHTML = '';
            const ordemNiveis = Object.keys(poderesPorNivel).sort((a,b) => a - b);

            for (const nivel of ordemNiveis) {
                let nivelLabel = `Poderes de Esforço (Nível ${nivel})`;
                if (nivel == 0) nivelLabel = "Poderes Passivos & À Vontade (Nível 0)";
                poderesHTML += `<h4 class="power-level-header">${nivelLabel}</h4>`;

                for (const poder of poderesPorNivel[nivel]) {
                    let custoPC_texto = `<strong>Custo (PC):</strong> ${poder.custo_pc}`;
                    if (poder.custo_pc === 0) {
                        custoPC_texto = `<strong>Custo (PC):</strong> Gratuito (Escolha de Matriz)`;
                    }

                    poderesHTML += `
                    <div class="poder-card-ref">
                        <div class="poder-card-header">
                            <strong>${poder.nome} (${poder.tipo})</strong>
                            <span>${custoPC_texto}</span>
                        </div>
                        <div class="poder-card-stats">
                            <span><strong>Custo (Ativação):</strong> ${poder.nivel == 0 ? '0 Espaços' : `1 Espaço Nv. ${poder.nivel}`}</span>
                            <span><strong>Ativação:</strong> ${poder.ativacao}</span>
                            <span><strong>Alcance:</strong> ${poder.alcance}</span>
                            <span><strong>Duração:</strong> ${poder.duracao}</span>
                        </div>
                        <div class="poder-card-desc">
                            ${poder.desc.map(p => `<p>${p}</p>`).join('')}
                            <p class="ranks-superiores"><strong>Em Níveis Superiores:</strong> ${poder.upcast}</p>
                        </div>
                    </div>
                    `;
                }
            }
            
            refContainer.innerHTML += `
                <article class="matriz-reference-entry">
                    <h3>${matriz.nome}</h3>
                    <p>${matriz.desc}</p>
                    <p><strong>Atributo Primário:</strong> ${matriz.atributoPrimario}</p>
                    <strong>Habilidades Iniciais:</strong>
                    <ul class="habilidades-iniciais">
                        ${matriz.habilidadesIniciais.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    ${poderesHTML}
                </article>
            `;
        }
    }

    buildReferencePage();

}); // Fim do 'DOMContentLoaded'