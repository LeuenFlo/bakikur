import { Component } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'moebel' | 'innenausbau' | 'restaurierung';
  imageUrl: string;
  material: string;
  completion: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Eleganter Klapptisch',
      description: 'Praktischer und stilvoller Klapptisch aus hochwertigem Holz, perfekt für flexible Raumnutzung',
      category: 'moebel',
      imageUrl: 'assets/images/klapptisch.jpg',
      material: 'Massivholz',
      completion: 'Januar 2024'
    },
    {
      id: 2,
      title: 'Moderne Sitzbank',
      description: 'Handgefertigte Sitzbank mit klaren Linien und komfortabler Polsterung',
      category: 'moebel',
      imageUrl: 'assets/images/bank.jpg',
      material: 'Massivholz, Polster',
      completion: 'Dezember 2023'
    },
    {
      id: 3,
      title: 'Einbauschrank nach Maß',
      description: 'Maßgefertigter Einbauschrank mit optimaler Raumnutzung und elegantem Design',
      category: 'innenausbau',
      imageUrl: 'assets/images/272858613_527332492058355_350812099419953533_n.jpg',
      material: 'Holzwerkstoff, Eiche furniert',
      completion: 'November 2023'
    },
    {
      id: 4,
      title: 'Küchenmöbel',
      description: 'Moderne Küchenmöbel mit hochwertigen Beschlägen und durchdachter Raumaufteilung',
      category: 'innenausbau',
      imageUrl: 'assets/images/274230217_539119180879686_4089096177529724589_n.jpg',
      material: 'Multiplex, Eiche',
      completion: 'Oktober 2023'
    },
    {
      id: 5,
      title: 'Restaurierte Holztüren',
      description: 'Fachgerechte Restaurierung historischer Holztüren mit Bewahrung der ursprünglichen Charakteristik',
      category: 'restaurierung',
      imageUrl: 'assets/images/166817284_323222232469383_8629170683145990355_n.jpg',
      material: 'Massivholz',
      completion: 'September 2023'
    },
    {
      id: 6,
      title: 'Badezimmermöbel',
      description: 'Wasserbeständige Badezimmermöbel mit modernem Design und praktischer Aufbewahrung',
      category: 'innenausbau',
      imageUrl: 'assets/images/275930533_557183349073269_1027403283594418107_n.jpg',
      material: 'Wasserfestes Holz, Glas',
      completion: 'August 2023'
    },
    {
      id: 7,
      title: 'Vintage Kommode',
      description: 'Liebevoll restaurierte Vintage-Kommode mit originalem Charme und modernen Funktionen',
      category: 'restaurierung',
      imageUrl: 'assets/images/165218654_319780879480185_791655402348798634_n.jpg',
      material: 'Antikes Holz',
      completion: 'Juli 2023'
    },
    {
      id: 8,
      title: 'Maßgefertigte Garderobe',
      description: 'Elegante Garderobenlösung mit integrierter Sitzbank und verstecktem Stauraum',
      category: 'innenausbau',
      imageUrl: 'assets/images/173351580_332704121521194_3199043170407150359_n.jpg',
      material: 'Eiche, Metall',
      completion: 'Juni 2023'
    },
    {
      id: 9,
      title: 'Designer Esstisch',
      description: 'Exklusiver Esstisch mit einzigartiger Holzmaserung und modernem Metallgestell',
      category: 'moebel',
      imageUrl: 'assets/images/186470630_351934169598189_7499588074027143111_n.jpg',
      material: 'Massivholz, Stahl',
      completion: 'Mai 2023'
    },
    {
      id: 10,
      title: 'Antiker Schreibtisch',
      description: 'Sorgfältig restaurierter Schreibtisch aus der Gründerzeit mit original Beschlägen',
      category: 'restaurierung',
      imageUrl: 'assets/images/167592435_323926579065615_4235416454899499471_n.jpg',
      material: 'Nussbaum',
      completion: 'April 2023'
    },
    {
      id: 11,
      title: 'Einbauküche Modern',
      description: 'Moderne Einbauküche mit grifflosen Fronten und hochwertigen Elektrogeräten',
      category: 'innenausbau',
      imageUrl: 'assets/images/217992676_388996635891942_8976062071638749035_n.jpg',
      material: 'MDF Hochglanz, Arbeitsplatte Granit',
      completion: 'März 2023'
    },
    {
      id: 12,
      title: 'Massivholzbett',
      description: 'Handgefertigtes Bett aus massiver Eiche mit integrierten Nachttischen',
      category: 'moebel',
      imageUrl: 'assets/images/263459089_489009239224014_1314902578724445827_n.jpg',
      material: 'Massiveiche',
      completion: 'Februar 2023'
    }
  ];

  filteredProjects: Project[] = this.projects;
  selectedProject: Project | null = null;
  activeFilter: string = 'all';

  filterProjects(category: string) {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
  }

  openProjectDetails(project: Project) {
    this.selectedProject = project;
  }

  closeProjectDetails() {
    this.selectedProject = null;
  }
}
