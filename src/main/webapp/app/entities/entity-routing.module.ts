import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employe-steel',
        data: { pageTitle: 'steelApp.employe.home.title' },
        loadChildren: () => import('./employe-steel/employe-steel.module').then(m => m.EmployeSteelModule),
      },
      {
        path: 'societe-steel',
        data: { pageTitle: 'steelApp.societe.home.title' },
        loadChildren: () => import('./societe-steel/societe-steel.module').then(m => m.SocieteSteelModule),
      },
      {
        path: 'succursale-steel',
        data: { pageTitle: 'steelApp.succursale.home.title' },
        loadChildren: () => import('./succursale-steel/succursale-steel.module').then(m => m.SuccursaleSteelModule),
      },
      {
        path: 'diplome-steel',
        data: { pageTitle: 'steelApp.diplome.home.title' },
        loadChildren: () => import('./diplome-steel/diplome-steel.module').then(m => m.DiplomeSteelModule),
      },
      {
        path: 'poste-steel',
        data: { pageTitle: 'steelApp.poste.home.title' },
        loadChildren: () => import('./poste-steel/poste-steel.module').then(m => m.PosteSteelModule),
      },
      {
        path: 'adresse-steel',
        data: { pageTitle: 'steelApp.adresse.home.title' },
        loadChildren: () => import('./adresse-steel/adresse-steel.module').then(m => m.AdresseSteelModule),
      },
      {
        path: 'type-contrat-de-travail-steel',
        data: { pageTitle: 'steelApp.typeContratDeTravail.home.title' },
        loadChildren: () =>
          import('./type-contrat-de-travail-steel/type-contrat-de-travail-steel.module').then(m => m.TypeContratDeTravailSteelModule),
      },
      {
        path: 'contrat-etablis-steel',
        data: { pageTitle: 'steelApp.contratEtablis.home.title' },
        loadChildren: () => import('./contrat-etablis-steel/contrat-etablis-steel.module').then(m => m.ContratEtablisSteelModule),
      },
      {
        path: 'type-document-steel',
        data: { pageTitle: 'steelApp.typeDocument.home.title' },
        loadChildren: () => import('./type-document-steel/type-document-steel.module').then(m => m.TypeDocumentSteelModule),
      },
      {
        path: 'composant-document-steel',
        data: { pageTitle: 'steelApp.composantDocument.home.title' },
        loadChildren: () => import('./composant-document-steel/composant-document-steel.module').then(m => m.ComposantDocumentSteelModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
